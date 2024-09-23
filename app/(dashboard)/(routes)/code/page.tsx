'use client';

import { MainHeading } from '@/components/MainHeading';
import { Code} from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { conversationPromptSchema } from './constants';
import { zodResolver } from '@hookform/resolvers/zod';

import { PlaceholdersAndVanishInput } from '@/components/ui/placeholders-and-vanish-input';
import Lottie from 'react-lottie';
import animationData from '@/public/Animation - 1721675923482.json';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/clerk-react';
import { OpenAI } from 'openai';
import dotenv from 'dotenv';
import { createRateLimiter } from '@/app/api/conversation/RateLimiter';
import Empty from '@/components/Empty';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

dotenv.config();
const opneapiKey = process.env.OPENAI_API_KEY || 'sk-proj-n9n5RpnHRz5mejMoJE80T3BlbkFJ7Xrh57sqjYLpGlmeQXVR';

const openai = new OpenAI({ apiKey: opneapiKey, dangerouslyAllowBrowser: true });
const rateLimiter = createRateLimiter(1000);

const placeholders = [
    "Write a Python function to reverse a string",
    "How to create a React component?",
    "Write the code to fetch data from an API in JavaScript"
];

const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const Conversation = () => {
    const router = useRouter();
    const { user } = useUser();
    const [messages, setMessages] = useState<(string | null)[]>([]);
    const [question, setQuestion] = useState('');
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const form = useForm<z.infer<typeof conversationPromptSchema>>({
        resolver: zodResolver(conversationPromptSchema),
        defaultValues: {
            prompt: ''
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
        setMessages([...messages, data]);
        console.log(data);

        await rateLimiter(); // Wait if necessary to respect the rate limit

        try {
            const completion = await openai.chat.completions.create({
                messages: [
                    {
                        role: "system",
                        content: "You are a code generator you must answer only in markdown snippets. use code comments for explanation . The JSON fields are: 'question' : 'asked by the user', 'answer' : 'response from the ai model'",
                    },
                    { role: "user", content: data },
                ],
                model: "gpt-4o-mini",
                response_format: { type: "json_object" },
            });
            const response = completion.choices[0].message.content;
            const responseObject = JSON.parse(response);

            console.log(responseObject);
            setMessages([...messages, responseObject]);
        } catch (error) {
            console.error("Error fetching completion:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <MainHeading
                title="Code Generation"
                description="Ask a question and get a code snippet in response."
                icon={Code}
                 iconColor="text-red-800"
                bgColor="bg-red-800/10"
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
            <div className='space-y-4 mt-4 h-96 overflow-y-auto'>

                {loading && (
                    <div className="flex justify-center items-center mt-4">
                        <Lottie options={defaultOptions} height={150} width={150} />
                    </div>
                )}

                {messages.length === 0 && (
                    <Empty label="No conversations yet. Start by asking a question." />
                )
                }

                {!loading && messages.length > 0 && messages.slice().reverse().map((message, index) => (
                    <div key={index} className='flex justify-center items-center'>
                        <div className='w-2/3 bg-gray-200 p-4 rounded-lg'>
                            <p className='flex items-center gap-4 mb-4'>
                            {user && <img src={user.imageUrl} alt="User Avatar" className="w-8 h-8 rounded-full" />}
                                 <strong>{message.question}</strong></p>

                            <p className='flex items-center gap-2 p-1 rounded-md overflow-auto'>
                            <Image src='/logo.png' width={38} height={38} objectFit='contain' alt='Empty Image' />
                            <ReactMarkdown>

                                {message.answer}
                            </ReactMarkdown>
                            </p>


                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
};

export default Conversation;
