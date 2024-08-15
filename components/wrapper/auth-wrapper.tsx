"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Heading from "@/components/ui/heading";
import CardWrapper from "@/components/wrapper/card-wrapper";
import DiscordAuthorise from "@/public/authorise-icon.svg"

interface AuthWrapperProps {
  children: React.ReactNode;
  title: string;
  backButtonLink?: string;
  backButtonTitle?: string;
  description?: string;
  className?: string;
  login?: boolean;
  isAuthorise?: boolean
}

export default function AuthWrapper({
  children,
  title,
  className,
  description,
  backButtonLink = "",
  backButtonTitle,
  login = false,
  isAuthorise=false
}: AuthWrapperProps) {
  return (
    <CardWrapper className={cn("flex", className,isAuthorise ? "flex-col": "")}>
      {isAuthorise && (
        <div className="flex items-center justify-center h-full w-full py-2">
          <Image src={DiscordAuthorise} height={94} width={169} alt="authorise"/>
        </div>
      )}
      <Card className="w-[480px] border-none">
        <CardHeader>
          <Heading title={title} description={description} />
        </CardHeader>
        <CardContent>{children}</CardContent>
        {backButtonLink && backButtonTitle && (
          <CardFooter>
            <Button
              variant="link"
              className="font-normal w-full"
              size="sm"
              asChild
            >
              <Link href={backButtonLink}>{backButtonTitle}</Link>
            </Button>
          </CardFooter>
        )}
      </Card>
      {login && (
        <div className="flex items-center mr-4">
          <Image
            src="/discord-image.jpg"
            width={300}
            height={400}
            alt="clone-image"
            className="object-contain"
          />
        </div>
      )}
    </CardWrapper>
  );
}
