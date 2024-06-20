import { createOpenAI } from '@ai-sdk/openai';

const apiKey = process.env.OPENAI_API_KEY

if (!apiKey) {
    throw Error("OPENAI_API_KEY is not set")
}

const openai = createOpenAI({
  apiKey,
  compatibility: 'strict', // strict mode, enable when using the OpenAI API
});

export const model = openai('gpt-4o-2024-05-13', {
  
});

