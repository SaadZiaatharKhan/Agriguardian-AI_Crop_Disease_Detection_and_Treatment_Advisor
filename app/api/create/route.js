import { StreamChat } from "stream-chat"

const api_key = process.env.GETSTREAM_API_KEY;
const api_secret =process.env.GETSTREAM_API_SECRET;

export async function POST(req) {
  function capitalize(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }  
  
  const { id, name, slug } = await req.json();
  const allowedSlugs = ["Farmers", "Advisors", "Retailers"];

  if (!id || !name || !allowedSlugs.includes(slug)) {
    return Response.json({ error: 'Invalid forum request' }, { status: 400 });
  }

  const serverClient = StreamChat.getInstance(api_key, api_secret);
  const token = serverClient.createToken(id);
  await serverClient.upsertUser({ id, name });

  const channel = serverClient.channel('messaging', slug, {
      image: 'https://getstream.io/random_png/?name=react',
      name: capitalize(slug)+' Discussion',
      created_by_id: id,
  });
  await channel.create();
  await channel.addMembers([id]);

  return Response.json({ token });
}
