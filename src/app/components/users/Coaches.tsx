// src/app/components/users/Coaches.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext'; // Updated path
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface Coach {
  id: number;
  firstName: string;
  lastName: string;
  specialization: string;
  createdAt: string;
  updatedAt: string;
}

const coachSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  specialization: z.string().min(1, 'Specialization is required'),
});

export default function Coaches() {
  const { user } = useAuth();
  const [coaches, setCoaches] = useState<Coach[]>([]);
  const [filteredCoaches, setFilteredCoaches] = useState<Coach[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingCoach, setEditingCoach] = useState<Coach | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const form = useForm<z.infer<typeof coachSchema>>({
    resolver: zodResolver(coachSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      specialization: '',
    },
  });

  useEffect(() => {
    if (user) {
      fetchCoaches();
    }
  }, [user]);

  useEffect(() => {
    const filtered = coaches.filter((coach) =>
      `${coach.firstName} ${coach.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coach.specialization.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCoaches(filtered);
  }, [searchTerm, coaches]);

  const fetchCoaches = async () => {
    setLoading(true);
    try {
      const token = await user!.getIdToken();
      const res = await fetch('/api/admin/coaches', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch coaches');
      const data = await res.json();
      setCoaches(data);
      setFilteredCoaches(data);
      setLoading(false);
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  };

  const handleAdd = async (data: z.infer<typeof coachSchema>) => {
    setIsSubmitting(true);
    try {
      const token = await user!.getIdToken();
      const res = await fetch('/api/admin/coaches', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to add coach');
      const newCoach = await res.json();
      setCoaches([...coaches, newCoach]);
      setFilteredCoaches([...filteredCoaches, newCoach]);
      setOpenAdd(false);
      form.reset();
      toast.success(`${data.firstName} ${data.lastName} added successfully`);
    } catch (err) {
      toast.error((err as Error).message || 'Failed to add coach');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (data: z.infer<typeof coachSchema>) => {
    if (!editingCoach) return;
    setIsSubmitting(true);
    try {
      const token = await user!.getIdToken();
      const res = await fetch('/api/admin/coaches', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: editingCoach.id, ...data }),
      });
      if (!res.ok) throw new Error('Failed to update coach');
      const updatedCoach = await res.json();
      setCoaches(coaches.map((c) => (c.id === updatedCoach.id ? updatedCoach : c)));
      setFilteredCoaches(filteredCoaches.map((c) => (c.id === updatedCoach.id ? updatedCoach : c)));
      setOpenEdit(false);
      setEditingCoach(null);
      form.reset();
      toast.success(`${data.firstName} ${data.lastName} updated successfully`);
    } catch (err) {
      toast.error((err as Error).message || 'Failed to update coach');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number, firstName: string, lastName: string) => {
    if (!confirm(`Are you sure you want to delete ${firstName} ${lastName}?`)) return;
    setIsSubmitting(true);
    try {
      const token = await user!.getIdToken();
      const res = await fetch(`/api/admin/coaches?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete coach');
      setCoaches(coaches.filter((c) => c.id !== id));
      setFilteredCoaches(filteredCoaches.filter((c) => c.id !== id));
      toast.success(`${firstName} ${lastName} deleted successfully`);
    } catch (err) {
      toast.error((err as Error).message || 'Failed to delete coach');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditDialog = (coach: Coach) => {
    setEditingCoach(coach);
    form.reset({
      firstName: coach.firstName,
      lastName: coach.lastName,
      specialization: coach.specialization,
    });
    setOpenEdit(true);
  };

  if (loading) return <p>Loading coaches...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>Please log in to view coaches.</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Coaches</h2>
        <div className="flex gap-4 items-center">
          <Input
            placeholder="Search coaches..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Dialog open={openAdd} onOpenChange={setOpenAdd}>
            <DialogTrigger asChild>
              <Button disabled={isSubmitting}>Add Coach</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Coach</DialogTitle>
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
                    name="specialization"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Specialization</FormLabel>
                        <FormControl>
                          <Input {...field} disabled={isSubmitting} />
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
                      'Add Coach'
                    )}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {filteredCoaches.length === 0 ? (
        <p>No coaches found.</p>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCoaches.map((coach) => (
                <TableRow key={coach.id}>
                  <TableCell>{coach.id}</TableCell>
                  <TableCell>{`${coach.firstName} ${coach.lastName}`}</TableCell>
                  <TableCell>{coach.specialization}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(coach)}
                      disabled={isSubmitting}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(coach.id, coach.firstName, coach.lastName)}
                      disabled={isSubmitting}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      <Dialog open={openEdit} onOpenChange={(open) => {
        if (!open) setEditingCoach(null);
        setOpenEdit(open);
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Coach</DialogTitle>
          </DialogHeader>
          {editingCoach && (
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
                  name="specialization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specialization</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isSubmitting} />
                      </FormControl>
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
        </DialogContent>
      </Dialog>
    </div>
  );
}