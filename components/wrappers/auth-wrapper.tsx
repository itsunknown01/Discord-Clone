"use client";

import React from "react";
import StarBackground from "../background/star-background";
import CardWrapper from "./card-wrapper";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Heading from "../ui/heading";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
      <StarBackground className="w-full h-full -z-20" />
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
