import React from 'react';
import Link from 'next/link';
// Import Container if it's a custom component, ensure the path is correct
import Container from './container';

const Footer = () => {
  return (
    <footer className="w-screen bg-accent-1 border-t border-accent-2">
      <Container>
        <div className="py-10 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-6xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Versa AI
          </h3>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            {/* Use <Link> for internal navigation if docs.servicestack.net is part of your application, otherwise keep <a> for external links */}
            <a
              href="https://docs.servicestack.net"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
              target="_blank" rel="noopener noreferrer"
            >
              Read Documentation
            </a>
            {/* Assuming this is an external link, keeping it as <a>. If it's internal, use <Link> */}
            <a
              href="https://github.com/NetCoreTemplates/nextjs"
              className="mx-3 font-bold hover:underline"
              target="_blank" rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;