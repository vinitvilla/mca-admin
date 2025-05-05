import { NextResponse } from 'next/server';
import knex from '@/lib/knex';
import { adminAuth } from '@/lib/firebaseAdmin';

export async function GET(request: Request) {
  const token = request.headers.get('Authorization')?.split('Bearer ')[1];
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await adminAuth.verifyIdToken(token);
    const coaches = await knex('coaches').select('*');
    return NextResponse.json(coaches);
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
    const { firstName, lastName, specialization } = body;
    if (!firstName || !lastName || !specialization) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const [coachId] = await knex('coaches').insert({ firstName, lastName, specialization }).returning('id');
    const newCoach = await knex('coaches').where('id', coachId).first();
    return NextResponse.json(newCoach, { status: 201 });
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
    const { id, firstName, lastName, specialization } = body;
    if (!id) return NextResponse.json({ error: 'Coach ID required' }, { status: 400 });
    const updated = await knex('coaches')
      .where('id', id)
      .update({ firstName, lastName, specialization, updatedAt: knex.fn.now() });
    if (!updated) return NextResponse.json({ error: 'Coach not found' }, { status: 404 });
    const updatedCoach = await knex('coaches').where('id', id).first();
    return NextResponse.json(updatedCoach);
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
    if (!id) return NextResponse.json({ error: 'Coach ID required' }, { status: 400 });
    const deleted = await knex('coaches').where('id', id).del();
    if (!deleted) return NextResponse.json({ error: 'Coach not found' }, { status: 404 });
    return NextResponse.json({ message: 'Coach deleted' });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}