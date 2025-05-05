// src/app/components/users/AddPlayerDialog.tsx
'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import PlayerForm, { playerSchema } from './PlayerForm';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';

interface AddPlayerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<z.infer<typeof playerSchema>>;
  onAdd: (data: z.infer<typeof playerSchema>) => void;
  isSubmitting: boolean;
}

export default function AddPlayerDialog({
  open,
  onOpenChange,
  form,
  onAdd,
  isSubmitting,
}: AddPlayerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button disabled={isSubmitting}>Add Player</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Player</DialogTitle>
          <DialogDescription>Fill in the details below to add a new player to the system.</DialogDescription>
        </DialogHeader>
        <PlayerForm form={form} onSubmit={onAdd} isSubmitting={isSubmitting} />
      </DialogContent>
    </Dialog>
  );
}