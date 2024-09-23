import { auth } from '@clerk/nextjs/server';
import type { NextApiRequest, NextApiResponse } from 'next';
import { OpenAI } from 'openai'; // Ensure you have imported OpenAI
import dotenv from 'dotenv';


dotenv.config();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });



// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content: "You are a helpful assistant designed to output JSON.",
//       },
//       { role: "user", content: "Who won the world series in 2020?" },
//     ],
//     model: "gpt-3.5-turbo-0125",
//     response_format: { type: "json_object" },
//   });
//   console.log(completion.choices[0].message.content);
// }

// main();


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  if (req.method === 'POST') {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant designed to output JSON.",
          },
          { role: "user", content: req.body.messages}, 
        ],
        model: "gpt-3.5-turbo-0125",
        response_format: { type: "json_object" },
      });
      console.log(completion.choices[0].message.content);
      res.status(200).json({ response: completion.choices[0].message.content });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}