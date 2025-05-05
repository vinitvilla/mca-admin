// src/app/(main)/admin/messages/route.tsx
import { NextRequest, NextResponse } from 'next/server';
import knex from '@/lib/knex';

// Types
interface Message {
  id: number;
  full_name: string;
  email: string;
  message: string;
  created_at: string;
  updated_at: string;
}

interface MessageRead {
  id: number;
  message_id: number;
  read_by_user_id: number;
  read_at: string;
}

// GET: Fetch all messages with read status
export async function GET(req: NextRequest) {
  try {
    const messages = await knex('messages')
      .select(
        'messages.*',
        knex.raw(`
          json_agg(
            json_build_object(
              'read_by_user_id', message_reads.read_by_user_id,
              'read_at', message_reads.read_at
            )
          ) as read_status
        `)
      )
      .leftJoin('message_reads', 'messages.id', 'message_reads.message_id')
      .groupBy('messages.id')
      .orderBy('messages.created_at', 'desc');

    return NextResponse.json({ messages }, { status: 200 });
  } catch (error) {
    console.error('Error fetching messages:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// POST: Create a new message
export async function POST(req: NextRequest) {
  try {
    const { fullName, email, message } = await req.json();

    if (!fullName || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const [newMessage] = await knex('messages')
      .insert({
        full_name: fullName,
        email,
        message,
      })
      .returning('*');

    return NextResponse.json({ message: newMessage }, { status: 201 });
  } catch (error) {
    console.error('Error creating message:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// PUT: Mark message as read
export async function PUT(req: NextRequest) {
  try {
    const { messageId, userId } = await req.json();

    if (!messageId || !userId) {
      return NextResponse.json(
        { error: 'Message ID and User ID are required' },
        { status: 400 }
      );
    }

    const [readStatus] = await knex('message_reads')
      .insert({
        message_id: messageId,
        read_by_user_id: userId,
      })
      .onConflict(['message_id', 'read_by_user_id'])
      .merge()
      .returning('*');

    return NextResponse.json({ readStatus }, { status: 200 });
  } catch (error) {
    console.error('Error marking message as read:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}