// src/app/components/users/Players.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Player {
  id: number;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  battingStyle: string;
  bowlingStyle: string | null;
  position: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

const playerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' }),
  battingStyle: z.string().min(1, 'Batting style is required'),
  bowlingStyle: z.string().nullable(),
  position: z.string().min(1, 'Position is required'),
  image: z.any().optional(),
});

export default function Players() {
  const { user } = useAuth();
  const [players, setPlayers] = useState<Player[]>([]);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const form = useForm<z.infer<typeof playerSchema>>({
    resolver: zodResolver(playerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      battingStyle: '',
      bowlingStyle: null,
      position: '',
      image: null,
    },
  });

  useEffect(() => {
    if (user) {
      fetchPlayers();
    }
  }, [user]);

  useEffect(() => {
    const filtered = players.filter((player) =>
      `${player.firstName} ${player.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.battingStyle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      player.position.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPlayers(filtered);
  }, [searchTerm, players]);

  const fetchPlayers = async () => {
    setLoading(true);
    try {
      const token = await user!.getIdToken();
      const res = await fetch('/api/admin/players', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch players');
      const data = await res.json();
      setPlayers(data);
      setFilteredPlayers(data);
      setLoading(false);
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const storageRef = ref(storage, `players/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
  };

  const handleAdd = async (data: z.infer<typeof playerSchema>) => {
    setIsSubmitting(true);
    try {
      const token = await user!.getIdToken();
      let imageUrl: string | undefined;

      if (data.image && data.image[0]) {
        imageUrl = await uploadImage(data.image[0]);
      }

      const payload = {
        ...data,
        bowlingStyle: data.bowlingStyle === 'none' ? null : data.bowlingStyle,
        imageUrl,
        image: undefined,
      };

      const res = await fetch('/api/admin/players', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to add player');
      const newPlayer = await res.json();
      setPlayers([...players, newPlayer]);
      setFilteredPlayers([...filteredPlayers, newPlayer]);
      setOpenAdd(false);
      form.reset();
      toast.success(`${data.firstName} ${data.lastName} added successfully`);
    } catch (err) {
      toast.error((err as Error).message || 'Failed to add player');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (data: z.infer<typeof playerSchema>) => {
    if (!editingPlayer) return;
    setIsSubmitting(true);
    try {
      const token = await user!.getIdToken();
      let imageUrl = editingPlayer.imageUrl;

      if (data.image && data.image[0]) {
        imageUrl = await uploadImage(data.image[0]);
      }

      const payload = {
        id: editingPlayer.id,
        ...data,
        bowlingStyle: data.bowlingStyle === 'none' ? null : data.bowlingStyle,
        imageUrl,
        image: undefined,
      };

      const res = await fetch('/api/admin/players', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed to update player');
      const updatedPlayer = await res.json();
      setPlayers(players.map((p) => (p.id === updatedPlayer.id ? updatedPlayer : p)));
      setFilteredPlayers(filteredPlayers.map((p) => (p.id === updatedPlayer.id ? updatedPlayer : p)));
      setOpenEdit(false);
      setEditingPlayer(null);
      form.reset();
      toast.success(`${data.firstName} ${data.lastName} updated successfully`);
    } catch (err) {
      toast.error((err as Error).message || 'Failed to update player');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number, firstName: string, lastName: string) => {
    if (!confirm(`Are you sure you want to delete ${firstName} ${lastName}?`)) return;
    setIsSubmitting(true);
    try {
      const token = await user!.getIdToken();
      const res = await fetch(`/api/admin/players?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete player');
      setPlayers(players.filter((p) => p.id !== id));
      setFilteredPlayers(filteredPlayers.filter((p) => p.id !== id));
      toast.success(`${firstName} ${lastName} deleted successfully`);
    } catch (err) {
      toast.error((err as Error).message || 'Failed to delete player');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditDialog = (player: Player) => {
    setEditingPlayer(player);
    form.reset({
      firstName: player.firstName,
      lastName: player.lastName,
      dateOfBirth: player.dateOfBirth.split('T')[0],
      battingStyle: player.battingStyle,
      bowlingStyle: player.bowlingStyle || 'none',
      position: player.position,
      image: null,
    });
    setOpenEdit(true);
  };

  if (loading) return <p>Loading players...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>Please log in to view players.</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Players</h2>
        <div className="flex gap-4 items-center">
          <Input
            placeholder="Search players..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Dialog open={openAdd} onOpenChange={setOpenAdd}>
            <DialogTrigger asChild>
              <Button disabled={isSubmitting}>Add Player</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Player</DialogTitle>
                <DialogDescription>Fill in the details below to add a new player to the system.</DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleAdd)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="battingStyle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Batting Style</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select batting style" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Right-hand">Right-hand</SelectItem>
                              <SelectItem value="Left-hand">Left-hand</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bowlingStyle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bowling Style (Optional)</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value || 'none'}
                            disabled={isSubmitting}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select bowling style" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="Right-arm fast">Right-arm fast</SelectItem>
                              <SelectItem value="Left-arm spin">Left-arm spin</SelectItem>
                              <SelectItem value="Leg-spin">Leg-spin</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select position" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Batsman">Batsman</SelectItem>
                              <SelectItem value="Bowler">Bowler</SelectItem>
                              <SelectItem value="All-rounder">All-rounder</SelectItem>
                              <SelectItem value="Wicket-keeper">Wicket-keeper</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, value, ...rest } }) => (
                      <FormItem>
                        <FormLabel>Player Image (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => onChange(e.target.files)}
                            disabled={isSubmitting}
                            {...rest}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Adding...
                      </>
                    ) : (
                      'Add Player'
                    )}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Batting Style</TableHead>
              <TableHead>Bowling Style</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPlayers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No players found.
                </TableCell>
              </TableRow>
            ) : (
              filteredPlayers.map((player) => (
                <TableRow key={player.id}>
                  <TableCell>{player.id}</TableCell>
                  <TableCell>
                    {player.imageUrl ? (
                      <Image
                        src={player.imageUrl}
                        alt={`${player.firstName} ${player.lastName}`}
                        width={50}
                        height={50}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      'N/A'
                    )}
                  </TableCell>
                  <TableCell>{`${player.firstName} ${player.lastName}`}</TableCell>
                  <TableCell>{new Date(player.dateOfBirth).toLocaleDateString()}</TableCell>
                  <TableCell>{player.battingStyle}</TableCell>
                  <TableCell>{player.bowlingStyle || 'N/A'}</TableCell>
                  <TableCell>{player.position}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(player)}
                      disabled={isSubmitting}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(player.id, player.firstName, player.lastName)}
                      disabled={isSubmitting}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <Dialog open={openEdit} onOpenChange={(open) => {
        if (!open) setEditingPlayer(null);
        setOpenEdit(open);
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Player</DialogTitle>
            <DialogDescription>Modify the details below to update the player’s information.</DialogDescription>
          </DialogHeader>
          <ScrollArea className='max-h-[80vh]'>
            {editingPlayer && (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleEdit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dateOfBirth"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} disabled={isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="battingStyle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Batting Style</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select batting style" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Right-hand">Right-hand</SelectItem>
                              <SelectItem value="Left-hand">Left-hand</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bowlingStyle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bowling Style (Optional)</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value || 'none'}
                            disabled={isSubmitting}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select bowling style" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">None</SelectItem>
                              <SelectItem value="Right-arm fast">Right-arm fast</SelectItem>
                              <SelectItem value="Left-arm spin">Left-arm spin</SelectItem>
                              <SelectItem value="Leg-spin">Leg-spin</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Position</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSubmitting}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select position" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Batsman">Batsman</SelectItem>
                              <SelectItem value="Bowler">Bowler</SelectItem>
                              <SelectItem value="All-rounder">All-rounder</SelectItem>
                              <SelectItem value="Wicket-keeper">Wicket-keeper</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field: { onChange, value, ...rest } }) => (
                      <FormItem>
                        <FormLabel>Player Image (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={(e) => onChange(e.target.files)}
                            disabled={isSubmitting}
                            {...rest}
                          />
                        </FormControl>
                        {editingPlayer.imageUrl && (
                          <div className="mt-2">
                            <Image
                              src={editingPlayer.imageUrl}
                              alt="Current player image"
                              width={100}
                              height={100}
                              className="rounded-full object-cover"
                            />
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </form>
              </Form>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}