// src/app/components/users/PlayerForm.tsx
'use client';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';

interface PlayerFormProps {
  form: UseFormReturn<z.infer<typeof playerSchema>>;
  onSubmit: (data: z.infer<typeof playerSchema>) => void;
  isSubmitting: boolean;
  isEditing?: boolean;
  currentImageUrl?: string;
}

export const playerSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date' }),
  battingStyle: z.string().min(1, 'Batting style is required'),
  bowlingStyle: z.string().nullable(),
  position: z.string().min(1, 'Position is required'),
  image: z.any().optional(),
});

export default function PlayerForm({
  form,
  onSubmit,
  isSubmitting,
  isEditing = false,
  currentImageUrl,
}: PlayerFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              {isEditing && currentImageUrl && (
                <div className="mt-2">
                  <Image
                    src={currentImageUrl}
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
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEditing ? 'Saving...' : 'Adding...'}
            </>
          ) : (
            isEditing ? 'Save Changes' : 'Add Player'
          )}
        </Button>
      </form>
    </Form>
  );
}