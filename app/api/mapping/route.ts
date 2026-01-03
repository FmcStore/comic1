import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Mapping } from '@/lib/models';
import { v4 as uuidv4 } from 'uuid';

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { slug, type } = await req.json();
    let data = await Mapping.findOne({ slug, type });
    if (!data) data = await Mapping.create({ uuid: uuidv4(), slug, type });
    return NextResponse.json({ uuid: data.uuid });
  } catch (e) {
    return NextResponse.json({ error: 'DB Error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const uuid = searchParams.get('uuid');
  try {
    await dbConnect();
    const data = await Mapping.findOne({ uuid });
    return data ? NextResponse.json(data) : NextResponse.json({ error: 'Not Found' }, { status: 404 });
  } catch (e) {
    return NextResponse.json({ error: 'DB Error' }, { status: 500 });
  }
}
