import React from 'react'
import { Button } from './ui/button'
import { Menu } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import MobileSidebar from './Mobile-Sidebar'

const Navbar = () => {
  return (
    <div className='flex items-center'>
        <div className='md:hidden'>
            <MobileSidebar/>
        </div>
        <div className='flex items-center justify-between w-full'>
            <div className='flex items-center'>
                <h1 className='text-md font-bold'></h1>
            </div>
            <div className='flex items-center'>
                <UserButton afterSignOutUrl='/'/>
            </div>
    </div>
    </div>
  )
}

export default Navbar