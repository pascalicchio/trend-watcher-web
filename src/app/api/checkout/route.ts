export async function POST() {
  return new Response('{"test":"ok"}', {
    headers: { 'Content-Type': 'application/json' },
  });
}
