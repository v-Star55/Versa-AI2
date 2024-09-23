import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import Image from 'next/image';

const LandingNav = () => {
  return (
    <nav className='w-screen p-2 text-white' style={{ display: 'flex', justifyContent: 'space-between',alignItems: 'center', position: 'sticky', top: 0, zIndex: 1000, backgroundColor: 'black' }}>
      <div style={{ position: 'relative', width: '100px', height: '50px' }}>
        {/* Logo of the site */}
        <Link href="/">
          <Image alt="logo" src="/Logo.png" layout="fill" objectFit="contain" />
        </Link>
      </div>
      <div className='text-white-900 text-lg' style={{ display: 'flex', gap: '30px' }}>
        {/* Navigation Links */}
        <Link className='hover:text-blue-500' href="#about-us">About Us</Link>
        <Link className='hover:text-blue-500' href="#contact-us">Contact Us</Link>
        <Link className='hover:text-blue-500' href="#reviews">Reviews</Link>
      </div>
      <div>
        {/* Login Button */}
        <Link href="/sign-in">
          <Button>Log In</Button>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNav;