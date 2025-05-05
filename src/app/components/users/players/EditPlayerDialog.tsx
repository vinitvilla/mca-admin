// src/app/components/users/EditPlayerDialog.tsx
'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import PlayerForm, { playerSchema } from './PlayerForm';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';

interface EditPlayerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<z.infer<typeof playerSchema>>;
  onEdit: (data: z.infer<typeof playerSchema>) => void;
  isSubmitting: boolean;
  editingPlayer: { id: number; imageUrl?: string } | null;
}

export default function EditPlayerDialog({
  open,
  onOpenChange,
  form,
  onEdit,
  isSubmitting,
  editingPlayer,
}: EditPlayerDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Player</DialogTitle>
          <DialogDescription>Modify the details below to update the player’s information.</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          {editingPlayer && (
            <PlayerForm
              form={form}
              onSubmit={onEdit}
              isSubmitting={isSubmitting}
              isEditing={true}
              currentImageUrl={editingPlayer.imageUrl}
            />
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}