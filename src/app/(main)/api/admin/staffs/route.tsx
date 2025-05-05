import { NextResponse } from 'next/server';
import knex from '@/lib/knex';
import { adminAuth } from '@/lib/firebaseAdmin';

export async function GET(request: Request) {
  const token = request.headers.get('Authorization')?.split('Bearer ')[1];
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await adminAuth.verifyIdToken(token);
    const staffs = await knex('staffs').select('*');
    return NextResponse.json(staffs);
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
    const { firstName, lastName, role } = body;
    if (!firstName || !lastName || !role) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const [staffId] = await knex('staffs').insert({ firstName, lastName, role }).returning('id');
    const newStaff = await knex('staffs').where('id', staffId).first();
    return NextResponse.json(newStaff, { status: 201 });
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
    const { id, firstName, lastName, role } = body;
    if (!id) return NextResponse.json({ error: 'Staff ID required' }, { status: 400 });
    const updated = await knex('staffs')
      .where('id', id)
      .update({ firstName, lastName, role, updatedAt: knex.fn.now() });
    if (!updated) return NextResponse.json({ error: 'Staff not found' }, { status: 404 });
    const updatedStaff = await knex('staffs').where('id', id).first();
    return NextResponse.json(updatedStaff);
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
    if (!id) return NextResponse.json({ error: 'Staff ID required' }, { status: 400 });
    const deleted = await knex('staffs').where('id', id).del();
    if (!deleted) return NextResponse.json({ error: 'Staff not found' }, { status: 404 });
    return NextResponse.json({ message: 'Staff deleted' });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}