import * as z from 'zod';

export const conversationPromptSchema = z.object({
    prompt: z.string().min(1, 'Prompt cannot be empty')
})