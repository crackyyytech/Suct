
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const avatarColors = [
  'bg-blue-200 text-blue-800 dark:bg-blue-800 dark:text-blue-200',
  'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200',
  'bg-purple-200 text-purple-800 dark:bg-purple-800 dark:text-purple-200',
  'bg-red-200 text-red-800 dark:bg-red-800 dark:text-red-200',
  'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200',
  'bg-indigo-200 text-indigo-800 dark:bg-indigo-800 dark:text-indigo-200',
  'bg-pink-200 text-pink-800 dark:bg-pink-800 dark:text-pink-200',
  'bg-teal-200 text-teal-800 dark:bg-teal-800 dark:text-teal-200',
];

export const getAvatarColor = (name: string) => {
  if (!name) return avatarColors[0];
  const charCodeSum = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return avatarColors[charCodeSum % avatarColors.length];
};
