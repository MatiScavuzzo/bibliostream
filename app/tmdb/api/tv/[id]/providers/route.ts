import { headersRequest } from '@utilities';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

const API_URL = process.env.API_URL_V3;

const options = {
  method: 'GET',
  headers: headersRequest,
};

export async function GET(
  req: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const id = params.id.toString();
    const res = await fetch(`${API_URL}/tv/${id}/watch/providers`, options);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    console.error(err);
  }
}
