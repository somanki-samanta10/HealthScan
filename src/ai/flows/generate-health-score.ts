'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a health score for a product based on its ingredients and nutritional data.
 *
 * - generateHealthScore - An async function that takes product ingredients and nutritional data as input and returns a health score (0-100) and an explanation.
 * - GenerateHealthScoreInput - The input type for the generateHealthScore function.
 * - GenerateHealthScoreOutput - The return type for the generateHealthScore function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Define the input schema
const GenerateHealthScoreInputSchema = z.object({
  ingredients: z.string().describe('List of ingredients in the product.'),
  nutritionData: z.string().describe('Nutritional information of the product.'),
});

export type GenerateHealthScoreInput = z.infer<typeof GenerateHealthScoreInputSchema>;

// Define the output schema
const GenerateHealthScoreOutputSchema = z.object({
  healthScore: z.number().describe('A health score between 0 and 100, where 0 is unhealthy and 100 is very healthy.'),
  explanation: z.string().describe('A simple explanation of why the product received this health score.'),
});

export type GenerateHealthScoreOutput = z.infer<typeof GenerateHealthScoreOutputSchema>;

// Define the tool (if needed, for fetching external data, not for core logic)

// Define the prompt
const generateHealthScorePrompt = ai.definePrompt({
  name: 'generateHealthScorePrompt',
  input: {schema: GenerateHealthScoreInputSchema},
  output: {schema: GenerateHealthScoreOutputSchema},
  prompt: `You are an AI assistant that analyzes food product ingredients and nutritional data to generate a health score (0-100) and provides a simple explanation.

  Analyze the following product information:
  Ingredients: {{{ingredients}}}
  Nutrition Data: {{{nutritionData}}}

  Provide a health score (0-100) based on the ingredients and nutritional data. A score of 0 is unhealthy, and 100 is very healthy.  Consider harmful ingredients (e.g., preservatives, additives, excess sugar, trans fats) and beneficial ingredients (e.g., fiber, protein, vitamins).

  Also, provide a concise and easy-to-understand explanation of why the product received that score.

  Ensure that the response adheres to the output schema.
  `,
});

// Define the flow
const generateHealthScoreFlow = ai.defineFlow(
  {
    name: 'generateHealthScoreFlow',
    inputSchema: GenerateHealthScoreInputSchema,
    outputSchema: GenerateHealthScoreOutputSchema,
  },
  async input => {
    const {output} = await generateHealthScorePrompt(input);
    return output!;
  }
);

/**
 * Analyzes product ingredients and nutritional data to generate a health score and explanation.
 * @param input - The input containing ingredients and nutrition data.
 * @returns The health score and explanation.
 */
export async function generateHealthScore(input: GenerateHealthScoreInput): Promise<GenerateHealthScoreOutput> {
  return generateHealthScoreFlow(input);
}
