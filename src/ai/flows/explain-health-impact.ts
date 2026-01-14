// src/ai/flows/explain-health-impact.ts
'use server';

/**
 * @fileOverview Explains the health impact of a product's ingredients in simple language.
 *
 * - explainHealthImpact - A function that explains the health impact of a product.
 * - ExplainHealthImpactInput - The input type for the explainHealthImpact function.
 * - ExplainHealthImpactOutput - The return type for the explainHealthImpact function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainHealthImpactInputSchema = z.object({
  ingredients: z.string().describe('A comma-separated list of ingredients.'),
  nutritionData: z.string().describe('The nutrition information for the product.'),
});
export type ExplainHealthImpactInput = z.infer<typeof ExplainHealthImpactInputSchema>;

const ExplainHealthImpactOutputSchema = z.object({
  explanation: z.string().describe('A simple explanation of the health impact of the product based on its ingredients and nutrition data.'),
  healthScore: z.number().describe('A health score between 0 and 100, where 0 is unhealthy and 100 is very healthy.'),
  warnings: z.string().describe('Any warnings about the product, such as allergy information, high sodium content, etc.'),
});
export type ExplainHealthImpactOutput = z.infer<typeof ExplainHealthImpactOutputSchema>;

export async function explainHealthImpact(input: ExplainHealthImpactInput): Promise<ExplainHealthImpactOutput> {
  return explainHealthImpactFlow(input);
}

const explainHealthImpactPrompt = ai.definePrompt({
  name: 'explainHealthImpactPrompt',
  input: {schema: ExplainHealthImpactInputSchema},
  output: {schema: ExplainHealthImpactOutputSchema},
  prompt: `You are a health expert. You will analyze the ingredients and nutrition data of a product and explain its health impact in simple, human-understandable language.

  Ingredients: {{{ingredients}}}
  Nutrition Data: {{{nutritionData}}}

  Generate a health score between 0 and 100, where 0 is unhealthy and 100 is very healthy.
  Identify any potential warnings, such as allergy information, high sodium content, etc.
  Provide a simple explanation of the health impact of the product based on its ingredients and nutrition data.
  Remember to use simple language that everyone can understand.

  Explanation:`,config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const explainHealthImpactFlow = ai.defineFlow(
  {
    name: 'explainHealthImpactFlow',
    inputSchema: ExplainHealthImpactInputSchema,
    outputSchema: ExplainHealthImpactOutputSchema,
  },
  async input => {
    const {output} = await explainHealthImpactPrompt(input);
    return output!;
  }
);
