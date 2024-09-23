// Import React and necessary Next.js components

"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Code, Icon, ImageIcon, LayoutDashboard, Mail, MessageSquare, Music, Search, VideoIcon, icons } from 'lucide-react';
import { usePathname } from 'next/navigation';

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Conversations",
        icon: MessageSquare,
        href: "/conversation",
        color: "text-yellow-500",
    },

    {
        label: "Image Generation",
        icon: ImageIcon,
        href: "/image",
        color: "text-violet-500",
    },

    {
        label: "Video Generation",
        icon: VideoIcon,
        href: "/video",
        color: "text-orange-500",
    },

    {
        label: "Music Generation",
        icon: Music,
        href: "/music",
        color: "text-emerald-500",
    },

    {
        label: "Code Generation",
        icon: Code,
        href: "/code",
        color: "text-red-800",
    },

]


const SidebarDash = () => {
    const pathname = usePathname();


    return (
        <div className={`space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white`}>
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" passHref>
                    <div className="flex items-center pl-3 mb-14">
                        <div className="relative w-12 h-12 mr-3">
                            <Image alt="logo" src="/Logo.png" layout="fill" objectFit="contain" />
                        </div>
                        <h1 className="text-xl font-bold">VERSA AI</h1>
                    </div>
                </Link>

                <div className="space-y-4">
                    {routes.map((route, index) => (
                        <Link key={index} href={route.href} passHref className='py-4'>
                            <div className={`flex items-center flex-1 cursor-pointer mb-4 p-2
                        ${pathname === route.href ? 'text-white bg-white/10' : 'text-zinc-500'}
                        hover:text-white hover:bg-white/10 rounded-lg transition`}>

                                <route.icon className={`w-6 h-6 mr-3 ${route.color}`} />
                                <h1 className='text-md font-medium'>{route.label}</h1>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-12">
                    <form>
                        <div className='flex items-center p-2'>
                            <Mail className="w-6 h-6 text-pink-500 mr-3" />
                            <h2 className="text-md font-semibold">Feedback</h2>
                        </div>
                        <textarea
                            className="w-full p-2 text-black mb-2"
                            placeholder="Your feedback..."
                        ></textarea>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Submit
                        </button>
                    </form>
                </div>


            </div>
        </div>
    );
};

export default SidebarDash;