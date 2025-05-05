import { NextResponse } from 'next/server';
import knex from '@/lib/knex';

export async function POST(request: Request) {
  try {
    const { uid, email, displayName } = await request.json();
    if (!uid || !email || !displayName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const roleId = (await knex('roles').where('name', 'player').first())?.id;

    await knex('users').insert({
      uid,
      email,
      displayName,
      roleId,
    });

    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}