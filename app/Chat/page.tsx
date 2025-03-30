import { UserButton, UserProfile } from '@clerk/nextjs';
import React from 'react';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
import Image from 'next/image';

export default async function Chat() {
  const Topics =[
    {
        Text:"Farmers",
        img:"/farmer_community.jpg",
        alt:"Community Group For Farmers so they can connect with each other",
        desc:"This is a Community Group For Farmers so they can connect with each other and share their knowledge with each other and get help from each other",
        slug:"Farmers"
    },
    {
        Text:"Treatment Advisors",
        img:"/crop_advisor.jpg",
        alt:"Community Group For Advisors so they can share their knowledge with each other",
        desc:"This is a Community Group For Advisors so they can share their knowledge with each other and get help from each other and connect with each other to give the best treatment for their crops",
        slug:"Advisors"
    },
    {
        Text:"Retailers",
        img:"/retailer.jpg",
        alt:"Community Group For Retailers so they can handle prices and discounts for their crops",
        desc:"This is a Community Group For Retailers so they can handle prices and discounts for their crops and get help from each other and connect with each other",
        slug:"Retailers"
    }
]
  const user = await currentUser();
  if (!user) return <div className="text-white text-xl">Not signed in</div>;

  return (
    <div className="relative h-full w-full bg-gradient-to-r from-[rgba(6,11,16,1)] to-[rgb(14,69,68)] ">
      <div className="relative flex justify-center items-center gap-4 pt-5 font-mono text-white text-xl">
        <UserButton />
        Hello {user?.firstName}
      </div>
      <div className='container mx-auto p-5'>
      <h1 className='text-center p-10 font-semibold text-4xl text-white '>Discussion Forums</h1>
      <div className="flex flex-wrap justify-center rounded-sm">
        {Topics.map((Topic)=>{
          return(
            <div key={Topic.img} className=" w-full shadow-white shadow-lg rounded-md  md:w-1/4 m-4 flex flex-col  items-center p-8">
            <Image alt='A learning platform' src={Topic.img} width={300} height={350} className='rounded-lg'></Image>
            <h2 className=' text-2xl pt-2 text-white'>{Topic.Text}</h2>
            <p className='flex flex-col pt-3 pb-5 h-72 text-white'>{Topic.desc}</p>
            <Link href={`/forum/${Topic.slug}`} >
            <button className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:bg-[rgba(0,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-md text-white font-light transition duration-200 ease-linear">
              Discuss Now
            </button>
            </Link>
            </div>
            )
        })}
      </div>
    </div>
</div>
  );
}
