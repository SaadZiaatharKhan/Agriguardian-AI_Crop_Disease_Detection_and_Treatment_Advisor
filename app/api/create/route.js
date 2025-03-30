import { StreamChat } from "stream-chat"

import { clerkClient } from '@clerk/nextjs/server';


//ENter you api key and secret here which you will get from getstream app 
const api_key = process.env.GETSTREAM_API_KEY;
const api_secret =process.env.GETSTREAM_API_SECRET;

// const user_id = "user_2rwpDqaNOBMtVcvGpJKu474zrUJ";

export async function POST(req) {
  function capitalize(input) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  }  
  
  const serverClient = StreamChat.getInstance(api_key, api_secret);
  const user=await req.json();
  
  const token=serverClient.createToken(user.data.id)

  console.log(token);
  const client = await clerkClient();
  await serverClient.upsertUser({id: user.data.id,role: 'admin'});

  await client.users.updateUserMetadata(user.data.id, {
    publicMetadata: {
      token:token
    },
  })

  // Giving  access to all users 
  const slugs = ["Farmers", "Advisors", "Retailers"];
  slugs.forEach(async(item)=>{
    const channel = serverClient.channel('messaging', item, {
      image: 'https://getstream.io/random_png/?name=react',
      
      name: capitalize(item)+' Discussion',
      created_by_id:user.data.id,
    });
    await channel.create();
    await channel.addMembers([user.data.id]);

  })
  return Response.json({ message: 'Hello World' })
}