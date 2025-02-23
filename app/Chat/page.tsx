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
      <div>
        kdfksjfsdjkjadj
      </div>
    </div>
</div>
  );
}
