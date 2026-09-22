import { UserProfile } from '@clerk/nextjs'
import React from 'react'

export default function Profile () {
  return (
    <div className='flex justify-center items-center mt-20 '>
      <UserProfile/>
    </div>
  )
}