'use server';
/**
 * @fileOverview An AI tutor flow for answering student questions based on lesson content.
 *
 * - askTutor - A function that handles the AI tutor's response generation.
 * - TutorInput - The input type for the askTutor function.
 * - TutorOutput - The return type for the askTutor function.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {z} from 'genkit';

const TutorInputSchema = z.object({
  question: z.string().describe('The student\'s question.'),
  chapterTitle: z.string().describe('The title of the current lesson chapter.'),
  summary: z.string().describe('A summary of the lesson content.'),
  keyTopics: z.array(z.string()).describe('A list of key topics covered in the lesson.'),
  learningOutcomes: z.array(z.string()).describe('A list of learning outcomes for the lesson.'),
});
export type TutorInput = z.infer<typeof TutorInputSchema>;

const TutorOutputSchema = z.object({
  response: z
    .string()
    .describe(
      "The AI tutor's helpful and encouraging response to the student's question, formatted with markdown."
    ),
  followUpQuestions: z
    .array(z.string())
    .optional()
    .describe(
      'A few suggested follow-up questions the student might have.'
    ),
});
export type TutorOutput = z.infer<typeof TutorOutputSchema>;

export async function askTutor(input: TutorInput): Promise<TutorOutput> {
  return tutorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tutorPrompt',
  model: googleAI.model('gemini-1.0-pro'),
  input: {schema: TutorInputSchema},
  output: {schema: TutorOutputSchema},
  prompt: `You are EduBot, a friendly and knowledgeable AI tutor for the EduConnect platform. Your persona is encouraging, patient, and slightly enthusiastic about learning.

Your primary goal is to help students understand the lesson material deeply.

**Your Instructions:**
1.  **Answer Directly:** Base your answers ONLY on the provided **Lesson Context**. Do not introduce any external information or facts.
2.  **Use Formatting:** Structure your answers for clarity. Use markdown for lists, bold text for key terms, and new paragraphs for distinct ideas.
3.  **Be Conversational:** Address the student directly. Keep your tone supportive and encouraging.
4.  **Check for Understanding:** After explaining a concept, you can ask a simple follow-up question to check if the student understood (e.g., "Does that make sense?").
5.  **Suggest Next Steps:** In your output, provide 2-3 relevant follow-up questions a curious student might ask next.
6.  **Handle Off-Topic Questions:** If the student's question is outside the scope of the lesson, gently guide them back. Say something like: "That's an interesting question! For now, though, let's focus on **{{{chapterTitle}}}**. Is there anything about the key topics that's on your mind?".
7.  **Keep it Concise:** Provide clear and concise explanations. Avoid overly long paragraphs.

**Lesson Context:**
*   **Chapter Title:** {{{chapterTitle}}}
*   **Summary:** {{{summary}}}
*   **Key Topics:**
    {{#each keyTopics}}
    - {{{this}}}
    {{/each}}
*   **Learning Outcomes:**
    {{#each learningOutcomes}}
    - {{{this}}}
    {{/each}}

**Student's Question:**
"{{{question}}}"

Now, as EduBot, provide your helpful, well-formatted response and suggest some follow-up questions based on the context.`,
});

const tutorFlow = ai.defineFlow(
  {
    name: 'tutorFlow',
    inputSchema: TutorInputSchema,
    outputSchema: TutorOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
