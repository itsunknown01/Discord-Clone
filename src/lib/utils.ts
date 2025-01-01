import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const normalizeString = (str: string) => {
  return str?.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const normalizedCompare = (a: string, b: string) => {
  return normalizeString(a)
    ?.toLowerCase()
    .includes(normalizeString(b).toLowerCase());
};