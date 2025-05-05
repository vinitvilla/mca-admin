// src/app/components/users/Staffs.tsx
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

interface Staff {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

const staffSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  role: z.string().min(1, 'Role is required'),
});

export default function Staffs() {
  const { user } = useAuth();
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [filteredStaffs, setFilteredStaffs] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const form = useForm<z.infer<typeof staffSchema>>({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      role: '',
    },
  });

  useEffect(() => {
    if (user) {
      fetchStaffs();
    }
  }, [user]);

  useEffect(() => {
    const filtered = staffs.filter((staff) =>
      `${staff.firstName} ${staff.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredStaffs(filtered);
  }, [searchTerm, staffs]);

  const fetchStaffs = async () => {
    setLoading(true);
    try {
      const token = await user!.getIdToken();
      const res = await fetch('/api/admin/staffs', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to fetch staffs');
      const data = await res.json();
      setStaffs(data);
      setFilteredStaffs(data);
      setLoading(false);
    } catch (err) {
      setError((err as Error).message);
      setLoading(false);
    }
  };

  const handleAdd = async (data: z.infer<typeof staffSchema>) => {
    setIsSubmitting(true);
    try {
      const token = await user!.getIdToken();
      const res = await fetch('/api/admin/staffs', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to add staff');
      const newStaff = await res.json();
      setStaffs([...staffs, newStaff]);
      setFilteredStaffs([...filteredStaffs, newStaff]);
      setOpenAdd(false);
      form.reset();
      toast.success(`${data.firstName} ${data.lastName} added successfully`);
    } catch (err) {
      toast.error((err as Error).message || 'Failed to add staff');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (data: z.infer<typeof staffSchema>) => {
    if (!editingStaff) return;
    setIsSubmitting(true);
    try {
      const token = await user!.getIdToken();
      const res = await fetch('/api/admin/staffs', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: editingStaff.id, ...data }),
      });
      if (!res.ok) throw new Error('Failed to update staff');
      const updatedStaff = await res.json();
      setStaffs(staffs.map((s) => (s.id === updatedStaff.id ? updatedStaff : s)));
      setFilteredStaffs(filteredStaffs.map((s) => (s.id === updatedStaff.id ? updatedStaff : s)));
      setOpenEdit(false);
      setEditingStaff(null);
      form.reset();
      toast.success(`${data.firstName} ${data.lastName} updated successfully`);
    } catch (err) {
      toast.error((err as Error).message || 'Failed to update staff');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: number, firstName: string, lastName: string) => {
    if (!confirm(`Are you sure you want to delete ${firstName} ${lastName}?`)) return;
    setIsSubmitting(true);
    try {
      const token = await user!.getIdToken();
      const res = await fetch(`/api/admin/staffs?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('Failed to delete staff');
      setStaffs(staffs.filter((s) => s.id !== id));
      setFilteredStaffs(filteredStaffs.filter((s) => s.id !== id));
      toast.success(`${firstName} ${lastName} deleted successfully`);
    } catch (err) {
      toast.error((err as Error).message || 'Failed to delete staff');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditDialog = (staff: Staff) => {
    setEditingStaff(staff);
    form.reset({
      firstName: staff.firstName,
      lastName: staff.lastName,
      role: staff.role,
    });
    setOpenEdit(true);
  };

  if (loading) return <p>Loading staffs...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!user) return <p>Please log in to view staffs.</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Staffs</h2>
        <div className="flex gap-4 items-center">
          <Input
            placeholder="Search staffs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Dialog open={openAdd} onOpenChange={setOpenAdd}>
            <DialogTrigger asChild>
              <Button disabled={isSubmitting}>Add Staff</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Staff</DialogTitle>
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
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
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
                      'Add Staff'
                    )}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      {filteredStaffs.length === 0 ? (
        <p>No staffs found.</p>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStaffs.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell>{staff.id}</TableCell>
                  <TableCell>{`${staff.firstName} ${staff.lastName}`}</TableCell>
                  <TableCell>{staff.role}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(staff)}
                      disabled={isSubmitting}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(staff.id, staff.firstName, staff.lastName)}
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
        if (!open) setEditingStaff(null);
        setOpenEdit(open);
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Staff</DialogTitle>
          </DialogHeader>
          {editingStaff && (
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
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
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