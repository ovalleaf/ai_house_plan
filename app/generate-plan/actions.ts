'use server'

import { model } from "@/config/openai";
import { generateText } from "ai";

export async function generatePlan(input) {
    const response = await generateText({
        model,
        prompt: `
            Generate a house plan based on the following criteria:
            ${JSON.stringify(input)}

            The result must be a flat SVG that is responsive.
            Each of the rooms should me a random shape within the SVG, the placement of the rooms must be practical, 
             There must not be any empty space in the SVG
             If possible, similar rooms must not be close to each other
           
            Only respond with the relative svg and nothing else, this is important, the svg must be valid
            `,
        
    });

	return response.text.replace('```svg', '').replace('```', '')
}

