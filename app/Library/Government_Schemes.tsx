import React from 'react'
import schemes from '@/data/schemes.json'
import Link from 'next/link'
import Image from 'next/image'
const GovernmentSchemes = () => {
  return (
    <div className="w-full bg-gray-100 min-h-screen p-10">
      <div className="flex flex-wrap justify-center gap-8">
        {schemes.map((scheme) => (
        <Link key={scheme.id} href={`/scheme/${scheme.id}`}>

            <div className="bg-white text-black p-4 rounded-lg shadow-md hover:shadow-lg cursor-pointer w-96">
              <Image
                src={scheme.image}
                alt={scheme.name}
                width={300}
                height={200}
                className="rounded-lg"
              />
              <h2 className="text-xl font-semibold mt-2 text-center">{scheme.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default GovernmentSchemes
