// src/app/(public)/api/admin/players/route.ts
import { NextResponse } from 'next/server';
import knex from '@/lib/knex';
import { adminAuth } from '@/lib/firebaseAdmin';
import { ref, deleteObject } from 'firebase/storage';
import { storage } from '@/lib/firebase';

export async function GET(request: Request) {
  const token = request.headers.get('Authorization')?.split('Bearer ')[1];
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await adminAuth.verifyIdToken(token);
    const players = await knex('players').select(
      'id',
      'firstName',
      'lastName',
      'dateOfBirth',
      'battingStyle',
      'bowlingStyle',
      'position',
      'imageUrl', // Add imageUrl to selection
      'createdAt',
      'updatedAt'
    );
    return NextResponse.json(players);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const token = request.headers.get('Authorization')?.split('Bearer ')[1];
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await adminAuth.verifyIdToken(token);
    const body = await request.json();
    const { firstName, lastName, dateOfBirth, battingStyle, bowlingStyle, position, imageUrl } = body;

    if (!firstName || !lastName || !dateOfBirth || !battingStyle || !position) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const [playerId] = await knex('players')
      .insert({
        firstName,
        lastName,
        dateOfBirth,
        battingStyle,
        bowlingStyle: bowlingStyle === 'none' ? null : bowlingStyle, // Handle "none" as null
        position,
        imageUrl, // Include imageUrl
        createdAt: knex.fn.now(),
        updatedAt: knex.fn.now(),
      })
      .returning('id');

    const newPlayer = await knex('players').where('id', playerId).first();
    return NextResponse.json(newPlayer, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const token = request.headers.get('Authorization')?.split('Bearer ')[1];
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await adminAuth.verifyIdToken(token);
    const body = await request.json();
    const { id, firstName, lastName, dateOfBirth, battingStyle, bowlingStyle, position, imageUrl } = body;

    if (!id) return NextResponse.json({ error: 'Player ID required' }, { status: 400 });

    const updated = await knex('players')
      .where('id', id)
      .update({
        firstName,
        lastName,
        dateOfBirth,
        battingStyle,
        bowlingStyle: bowlingStyle === 'none' ? null : bowlingStyle, // Handle "none" as null
        position,
        imageUrl, // Include imageUrl
        updatedAt: knex.fn.now(),
      });

    if (!updated) return NextResponse.json({ error: 'Player not found' }, { status: 404 });

    const updatedPlayer = await knex('players').where('id', id).first();
    return NextResponse.json(updatedPlayer);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const token = request.headers.get('Authorization')?.split('Bearer ')[1];
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await adminAuth.verifyIdToken(token);
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'Player ID required' }, { status: 400 });
    // Fetch player to get imageUrl
    const player = await knex('players').where('id', id).first();
    if (!player) return NextResponse.json({ error: 'Player not found' }, { status: 404 });

    // Delete player from database
    await knex('players').where('id', id).del();

    // Delete image from Firebase Storage if it exists
    if (player.imageUrl) {
      const imageRef = ref(storage, player.imageUrl);
      await deleteObject(imageRef).catch((err) => {
        console.error('Failed to delete image from storage:', err);
        // Log error but don’t fail the request
      });
    }

    return NextResponse.json({ message: 'Player deleted' });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}