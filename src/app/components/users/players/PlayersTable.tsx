// src/app/components/users/PlayersTable.tsx
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowUp, ArrowDown } from 'lucide-react';

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

interface PlayersTableProps {
  players: Player[];
  isSubmitting: boolean;
  onEdit: (player: Player) => void;
  onDelete: (id: number, firstName: string, lastName: string) => void;
  sortColumn: keyof Player | null;
  sortDirection: 'asc' | 'desc';
  onSort: (column: keyof Player) => void;
}

export default function PlayersTable({
  players,
  isSubmitting,
  onEdit,
  onDelete,
  sortColumn,
  sortDirection,
  onSort,
}: PlayersTableProps) {
  const renderSortIcon = (column: keyof Player) => {
    if (sortColumn !== column) return null;
    return sortDirection === 'asc' ? (
      <ArrowUp className="ml-2 h-4 w-4 inline" />
    ) : (
      <ArrowDown className="ml-2 h-4 w-4 inline" />
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => onSort('id')}>
              ID {renderSortIcon('id')}
            </TableHead>
            <TableHead>Image</TableHead>
            <TableHead className="cursor-pointer" onClick={() => onSort('firstName')}>
              Name {renderSortIcon('firstName')}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => onSort('dateOfBirth')}>
              Date of Birth {renderSortIcon('dateOfBirth')}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => onSort('battingStyle')}>
              Batting Style {renderSortIcon('battingStyle')}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => onSort('bowlingStyle')}>
              Bowling Style {renderSortIcon('bowlingStyle')}
            </TableHead>
            <TableHead className="cursor-pointer" onClick={() => onSort('position')}>
              Position {renderSortIcon('position')}
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {players.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                No players found.
              </TableCell>
            </TableRow>
          ) : (
            players.map((player) => (
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
                    onClick={() => onEdit(player)}
                    disabled={isSubmitting}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDelete(player.id, player.firstName, player.lastName)}
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
  );
}