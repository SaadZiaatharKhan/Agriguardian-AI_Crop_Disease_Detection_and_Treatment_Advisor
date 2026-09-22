import React from 'react'
import ShootingStarsAndStarsBackground1 from '@/components/about/shooting-stars-and-stars-background-1'
import ShootingStarsAndStarsBackground2 from '@/components/about/shooting-stars-and-stars-background-2'
import ShootingStarsAndStarsBackground3 from '@/components/about/shooting-stars-and-stars-background-3'

export default function About () {
  return (
    <div className='h-fit select-none cursor-pointer'>
      <ShootingStarsAndStarsBackground1/>
      <ShootingStarsAndStarsBackground2/>
      <ShootingStarsAndStarsBackground3/>
    </div>
  )
}