import { NextResponse } from 'next/server';
import knex from '@/lib/knex';
import { adminAuth } from '@/lib/firebaseAdmin';

export async function GET(request: Request) {
  const token = request.headers.get('Authorization')?.split('Bearer ')[1];
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    const uid = decodedToken.uid;

    const userData = await knex('users')
      .join('roles', 'users.roleId', 'roles.id')
      .where('users.uid', uid)
      .select('users.uid', 'users.email', 'users.displayName', 'users.roleId', 'roles.name as roleName')
      .first();

    if (!userData) {
      return NextResponse.json({ error: 'User not found in database' }, { status: 404 });
    }

    return NextResponse.json({
      uid: userData.uid,
      email: userData.email,
      displayName: userData.displayName,
      roleId: userData.roleId,
      roleName: userData.roleName,
    });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}