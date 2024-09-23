import React from 'react'
interface EmptyProps {
    label: string;
}

import Image from 'next/image';



const Empty = ({
    label
}: EmptyProps) => {
  return (
    <div className='h-full p-20 flex flex-col items-center justify-center'>
        <div className='relative h-72 w-72'>
            <Image src='/empty.png' layout='fill' objectFit='contain' alt='Empty Image' />
        </div>

        <p className='text-muted-foreground font-semibold text-center'>{label}</p>

    </div>
  )
}

export default Empty