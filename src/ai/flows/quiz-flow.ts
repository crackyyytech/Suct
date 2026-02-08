'use server';
/**
 * @fileOverview A Genkit flow for generating a multiple-choice quiz from lesson content.
 *
 * - generateQuiz - A function that creates a quiz based on chapter details.
 * - QuizInput - The input type for the generateQuiz function.
 * - QuizOutput - The return type for the generateQuiz function, structured as a quiz.
 */

import {ai} from '@/ai/genkit';
import {googleAI} from '@genkit-ai/google-genai';
import {z} from 'genkit';

const QuizInputSchema = z.object({
  chapterTitle: z.string().describe('The title of the lesson chapter.'),
  summary: z.string().describe('A summary of the lesson content.'),
  keyTopics: z.array(z.string()).describe('A list of key topics from the lesson.'),
  learningOutcomes: z.array(z.string()).describe('A list of learning outcomes for the lesson.'),
  numQuestions: z.number().min(1).max(10).default(4).describe('The number of questions to generate.'),
});
export type QuizInput = z.infer<typeof QuizInputSchema>;

const QuizQuestionSchema = z.object({
    id: z.string().describe("A unique identifier for the question (e.g., 'q-1', 'q-2')."),
    question: z.string().describe("The text of the quiz question."),
    options: z.array(z.object({
        id: z.string().describe("A unique identifier for the option (e.g., 'opt-1', 'opt-2')."),
        text: z.string().describe("The text of the answer option."),
    })).length(4).describe("An array of exactly four possible answer options."),
    correctAnswerId: z.string().describe("The 'id' of the correct option from the 'options' array."),
});

const QuizOutputSchema = z.object({
    id: z.string().describe("A unique identifier for the quiz (e.g., 'quiz-1')."),
    title: z.string().describe("The title of the quiz, which should be related to the chapter title."),
    questions: z.array(QuizQuestionSchema).describe("An array of quiz questions."),
});
export type QuizOutput = z.infer<typeof QuizOutputSchema>;


export async function generateQuiz(input: QuizInput): Promise<QuizOutput> {
  return quizFlow(input);
}

const prompt = ai.definePrompt({
  name: 'quizPrompt',
  model: googleAI.model('gemini-1.0-pro'),
  input: {schema: QuizInputSchema},
  output: {schema: QuizOutputSchema},
  prompt: `You are an expert curriculum developer. Your task is to create a multiple-choice quiz based on the provided lesson material.

The quiz must strictly assess the information given in the lesson context. Do not introduce any external knowledge.

Generate exactly {{{numQuestions}}} questions.
Each question must have exactly 4 options.
One of the options must be the correct answer.
Ensure the 'id' fields for questions and options are unique and follow the format 'q-1', 'q-2', 'opt-1', 'opt-2', etc.
The quiz title should be derived from the chapter title.

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

Now, generate the quiz in the specified JSON format.
`,
});

const quizFlow = ai.defineFlow(
  {
    name: 'quizFlow',
    inputSchema: QuizInputSchema,
    outputSchema: QuizOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
