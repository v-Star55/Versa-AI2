'use client';

import { MainHeading } from '@/components/MainHeading';
import { Music } from 'lucide-react';
import React, { useState } from 'react';
import * as z from 'zod';
import { conversationPromptSchema } from './constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import Lottie from 'react-lottie';
import animationData from '@/public/Animation - 1721675923482.json';
import axios from 'axios';
import { formSchema } from './constants';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';
import { OpenAI } from 'openai';
import Replicate from "replicate";
import { useForm } from 'react-hook-form';
import dotenv from 'dotenv';
import { auth } from '@clerk/nextjs/server';
import { createRateLimiter } from '@/app/api/conversation/RateLimiter';
import Empty from '@/components/Empty';
import Image from 'next/image';
import AudioPlayer from '@/components/AudioPlayer';


dotenv.config();
const openaiKey = process.env.OPENAI_API_KEY || 'sk-proj-n9n5RpnHRz5mejMoJE80T3BlbkFJ7Xrh57sqjYLpGlmeQXVR';

const openai = new OpenAI({ apiKey: openaiKey, dangerouslyAllowBrowser: true });
const rateLimiter = createRateLimiter(1000);



const placeholders = [
    "Piano Melody in C Major",
    "Generate a melody in D Minor",
    "Guitar Melody in E Major",
    "Flute Melody ",
];

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

interface Image {
    url: string;
}

const Conversation = () => {
    const router = useRouter();
    const { user } = useUser();
    const [images, setImages] = useState<Image[]>([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: '',
            amount: 1,
            resolution: 512
        }
    });

    const isLoading = form.formState.isSubmitting;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading(true);
        e.preventDefault();
        const data = inputValue;
        console.log(data);
        try {
            setImages([]); // Clear previous images
            const response = await openai.images.generate({
                model: "dall-e-2",
                prompt: data,
                n: 4,
                response_format: "url",
            });

            console.log(response.data);

            const generatedImages = response.data.map((item: any) => ({
                url: item.url,
            }));

            setImages(generatedImages);
            console.log(generatedImages);
        } catch (error) {
            console.error("Error generating images:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <MainHeading
                title="Image Generation"
                description="Generate images via simple prompts"
                icon={Music}
                iconColor="text-violet-500"
                bgColor="bg-violet-500/10"
            />

            <div className="px-4 lg:px-8 w-full">
                <div className="flex justify-center items-center px-4 w-full">
                    <PlaceholdersAndVanishInput
                        placeholders={placeholders}
                        onChange={handleChange}
                        onSubmit={onSubmit}
                    />
                </div>
            </div>

            <div className='space-y-4 mt-4'>
                {loading && (
                    <div className="p-8 rounded-lg flex justify-center items-center bg-muted">
                        <Lottie options={defaultOptions} height={150} width={150} />
                    </div>
                )}
                {images.length === 0 && !loading && (
                    <Empty label='No Melody Created' />
                )}
                <div>
                    {images.map((image, index) => (
                        <div key={index} className='flex justify-center items-center overflow-auto'>
                            <div className='w-2/3 bg-gray-200 p-4 rounded-lg overflow-auto'>

                                
                                {/* <Image src={image.url} width={512} height={512} objectFit='contain' alt='Generated Image' /> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Conversation;