import { NextResponse } from 'next/server';
import knex from '@/lib/knex';

export async function GET() {
  try {
    console.log('GET /api/admin/pages');
    const pages = await knex('pages').select('pageId', 'title');
    return NextResponse.json(pages);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
  }
}