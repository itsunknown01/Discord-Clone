import { type ClassValue,clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import {BiSolidPhoneCall} from "react-icons/bi"
import { ReactNode } from "react";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}