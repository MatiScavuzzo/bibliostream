import { headersRequest } from '@utilities';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

const API_URL = process.env.API_URL_V3;

const options = {
  method: 'GET',
  headers: headersRequest,
};

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = searchParams.get('page') ? searchParams.get('page') : '1';
    const res = await fetch(
      `${API_URL}/tv/popular?language=en-US&page=${page}&append_to_response=backdrop_path,poster_path`,
      options
    );
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return Response.json(data);
  } catch (err) {
    console.error(err);
  }
}
