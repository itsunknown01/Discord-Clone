"use client";

import { ListedServer } from "@/lib/mock-data/mock";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from "lucide-react";

interface ServerHeaderProps {
  server: ListedServer;
}

export default function ServerHeader({ server }: ServerHeaderProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className=" focus:outline-none">
        <button className="w-full text-md font-semibold px-3 flex items-center justify-between h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
          {server.name}
          <ChevronDown className="h-5 w-5" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
        <DropdownMenuItem
          onClick={() => {}}
          className="text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer"
        >
          Invite People
          <UserPlus className="h-4 w-4 ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {}}
          className="px-3 py-2 text-sm cursor-pointer"
        >
          Server Settings
          <Settings className="h-4 w-4 ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuItem
          className="px-3 py-2 text-sm cursor-pointer"
          onClick={() => {}}
        >
          Manage Members
          <Users className="h-4 w-4 ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {}}
          className="px-3 py-2 text-sm cursor-pointer"
        >
          Create Channel
          <PlusCircle className="h-4 w-4 ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {}}
          className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
        >
          Delete Server
          <Trash className="h-4 w-4 ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {}}
          className="text-rose-500 px-3 py-2 text-sm cursor-pointer"
        >
          Leave Server
          <LogOut className="h-4 w-4 ml-auto" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
