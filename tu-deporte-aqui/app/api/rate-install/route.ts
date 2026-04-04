import { NextRequest } from 'next/server';

export async function POST(
  request: NextRequest
) {
  const searchParams = request.nextUrl.searchParams;
  const rating = searchParams.get('rating');

  console.log(rating);

  return Response.json({ success: true });
}