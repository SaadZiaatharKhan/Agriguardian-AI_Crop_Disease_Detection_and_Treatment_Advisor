import { UserButton, UserProfile } from '@clerk/nextjs';
import React from 'react';
import { currentUser } from '@clerk/nextjs/server';

export default async function Chat() {
  const user = await currentUser();

  if (!user) return <div className="text-white text-xl">Not signed in</div>;

  return (
    <div className="relative h-full w-full bg-slate-950">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]"></div>
      <div className="relative flex justify-center items-center gap-4 mt-5 font-mono text-white text-xl">
        <UserButton />
        Hello {user?.firstName}
      </div>
      <div>
        kdfksjfsdjkjadj
      </div>

    </div>
  );
}
