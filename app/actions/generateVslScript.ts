'use server'

import { createStreamableValue } from "ai/rsc";
import openai from '@/lib/openai';
import sections from '@/generatePrompts/sections';
import { INPUT_CHAR_LIMITS } from '@/lib/constants';

// Define the interface for form data
interface FormData {
  businessDescription: string;
  [key: string]: string;
}

function validateInput(input: string, limit: number): string | null {
  if (input.length > limit) {
    return `Input must be ${limit} characters or less.`;
  }
  return null;
}

function validateFormData(formData: FormData): string | null {
  const { businessDescription, ...sectionAnswers } = formData;

  const businessDescriptionError = validateInput(businessDescription, INPUT_CHAR_LIMITS.businessDescription);
  if (businessDescriptionError) return businessDescriptionError;

  for (const [key, value] of Object.entries(sectionAnswers)) {
    const error = validateInput(value as string, INPUT_CHAR_LIMITS.defaultInputLimit);
    if (error) return `${key}: ${error}`;
  }

  return null;
}

function infuseAnswers(prompt: string, answers: Record<string, string>, businessDescription: string) {
  console.log('Answers:', answers);
  console.log('Business Description:', businessDescription);
  
  let infusedPrompt = prompt.replace(/\{insert answer to question (\d+)\}/g, (_, key) => {
    const adjustedKey = `question${parseInt(key) - 1}`;
    const answer = answers[adjustedKey] || '';
    console.log(`Replacing {insert answer to question ${key}} with:`, answer);
    return answer;
  });

  // Add the business description to the prompt
  infusedPrompt = `Business Description: ${businessDescription}\n\n${infusedPrompt}`;
  
  return infusedPrompt;
}

export async function generateVslScript(formData: FormData, sectionKey: string) {
  const stream = createStreamableValue();

  (async () => {
    console.log('Received formData:', formData);

    const validationError = validateFormData(formData);
    if (validationError) {
      stream.update(`Error: ${validationError}`);
      stream.done();
      return;
    }

    const { businessDescription, ...sectionAnswers } = formData;

    const sectionPrompt = sections[sectionKey as keyof typeof sections];
    const infusedPrompt = infuseAnswers(sectionPrompt, sectionAnswers, businessDescription);

    console.log('Infused prompt:', infusedPrompt);

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: 'user', content: infusedPrompt }],
      stream: true,
    });

    for await (const chunk of response) {
      const content = chunk.choices[0]?.delta?.content || '';
      stream.update(content);
    }

    stream.done();
  })();

  return stream.value;
}