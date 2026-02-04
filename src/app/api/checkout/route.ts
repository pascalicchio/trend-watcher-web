export async function GET() {
  return new Response('{"test":"ok"}', {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST() {
  return new Response('{"test":"post"}', {
    headers: { 'Content-Type': 'application/json' },
  });
}
