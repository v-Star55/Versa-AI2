import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, Code, ImageIcon, MessageSquare, Music, VideoIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { FlipWords } from '@/components/ui/flip-card';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import Link from 'next/link';

const tools = [
  {
    label: "Conversations",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-yellow-500",
    bgcolor: "bg-yellow-500/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image",
    color: "text-violet-500",
    bgcolor: "bg-violet-500/10",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video",
    color: "text-orange-500",
    bgcolor: "bg-orange-500/10",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music",
    color: "text-emerald-500",
    bgcolor: "bg-emerald-500/10",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code",
    color: "text-red-800",
    bgcolor: "bg-red-800/10",
  },
];



const Headingwords = `Explore the power of AI `;


const DashboardPage = () => {
  const words = [" Code", "Music", "Video", "Image", "Conversations"];
  return (
    <div>
    <div className="mb-8 space-y-4">
      <div className="text-3xl md:text-4xl font-bold text-center">
        <TextGenerateEffect  words={Headingwords} />
        <div className="text-xl md:text-2xl text-center"> 
          Generate <FlipWords words={words} /> <br />
        </div>
      </div>
    </div>



      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center space-x-4">
              <tool.icon
                size="32"

                className={`rounded-lg ${tool.color} ${tool.bgcolor} p-1`}
              />
              <h3 className="text-md font-semibold">{tool.label}</h3>
            </div>

            <Link href={tool.href}>
            <Button className='group hover:text-red-700'>
              Try Now &nbsp;
              <span className='inline-block group-hover:translate-x-1 transition-transform'>
                <ArrowRightIcon size="16" />
              </span>
            </Button>
            </Link>
          </Card>
        ))}
      </div>



    </div>
  );
}

export default DashboardPage;