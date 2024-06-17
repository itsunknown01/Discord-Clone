"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Heading from "../ui/heading";
import CardWrapper from "./card-wrapper";

interface AuthWrapperProps {
  children: React.ReactNode;
  title: string;
  backButtonLink: string;
  backButtonTitle: string;
  description?: string;
  className?: string;
  login?: boolean;
}

export default function AuthWrapper({
  children,
  title,
  className,
  description,
  backButtonLink,
  backButtonTitle,
  login = false,
}: AuthWrapperProps) {
  return (
    <CardWrapper className={cn("flex", className)}>
      <Card className="w-[480px] border-none">
        <CardHeader>
          <Heading title={title} description={description} />
        </CardHeader>
        <CardContent>{children}</CardContent>
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
