// src/app/components/users/Players.tsx
'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import PlayersTable from './PlayersTable';
import AddPlayerDialog from './AddPlayerDialog';
import EditPlayerDialog from './EditPlayerDialog';
import { playerSchema } from './PlayerForm';
import { z } from 'zod';

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
  const [sortColumn, setSortColumn] = useState<keyof Player | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

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
    let filtered = players.filter(
      (player) =>
        `${player.firstName} ${player.lastName}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        player.battingStyle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.position.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortColumn) {
      filtered.sort((a, b) => {
        const aValue = sortColumn === 'firstName' ? `${a.firstName} ${a.lastName}` : a[sortColumn] ?? '';
        const bValue = sortColumn === 'firstName' ? `${b.firstName} ${b.lastName}` : b[sortColumn] ?? '';
        if (sortDirection === 'asc') {
          return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
        } else {
          return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
        }
      });
    }

    setFilteredPlayers(filtered);
  }, [searchTerm, players, sortColumn, sortDirection]);

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

  const handleSort = (column: keyof Player) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
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
          <AddPlayerDialog
            open={openAdd}
            onOpenChange={setOpenAdd}
            form={form}
            onAdd={handleAdd}
            isSubmitting={isSubmitting}
          />
        </div>
      </div>
      <PlayersTable
        players={filteredPlayers}
        isSubmitting={isSubmitting}
        onEdit={openEditDialog}
        onDelete={handleDelete}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
      />
      <EditPlayerDialog
        open={openEdit}
        onOpenChange={(open) => {
          if (!open) setEditingPlayer(null);
          setOpenEdit(open);
        }}
        form={form}
        onEdit={handleEdit}
        isSubmitting={isSubmitting}
        editingPlayer={editingPlayer}
      />
    </div>
  );
}