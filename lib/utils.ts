import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const normalizeString = (str: string) => {
  return str?.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const normalizedCompare = (a: string, b: string) => {
  return normalizeString(a)
    ?.toLowerCase()
    .includes(normalizeString(b).toLowerCase());
};


export enum Time {
  FourHours = "4h",
  OneHour = "1h",
  ThirtyMinutes = "30min",
  DoNotClean = "none",
}

export function calculateHoursBetweenDates(date1: any, date2: Date) {
  return Math.floor(Math.abs(date1?.getTime() - date2.getTime()) / 3600000);
}