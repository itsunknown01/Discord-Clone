"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

import Heading from "@/components/common/heading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import CardWrapper from "@/components/wrapper/card-wrapper";
import { cn } from "@/lib/utils";

interface AuthWrapperProps {
  children: React.ReactNode;
  title: string;
  backButtonLink?: string;
  backButtonTitle?: string;
  backButtonDescription?: string;
  description?: string;
  className?: string;
  login?: boolean;
  isAuthorise?: boolean;
}

export default function AuthWrapper({
  children,
  title,
  className,
  description,
  backButtonLink = "",
  backButtonTitle,
  backButtonDescription = "",
  login = false,
  isAuthorise = false,
}: AuthWrapperProps) {
  return (
    <CardWrapper
      className={cn("flex", className, isAuthorise ? "flex-col justify-center" : "")}
    >
      {isAuthorise && (
        <div className="flex items-center justify-center h-24 md:h-full w-full py-2">
          <Image
            src="/authorise-icon.svg"
            height={94}
            width={169}
            alt="authorise"
          />
        </div>
      )}
      <Card className="lg:min-w-[480px] w-full border-none bg-[#313338] shadow-none">
        <Image
          src="/discord-icon.svg"
          alt="discord icon"
          width={124}
          height={24}
          className="lg:hidden block mx-auto my-4"
        />
        <CardHeader>
          <Heading title={title} description={description} />
        </CardHeader>
        <CardContent className="pb-1">{children}</CardContent>
        {backButtonLink && backButtonTitle && (
          <CardFooter>
            {backButtonDescription !== "" && (
              <span className="text-gray-400 pr-2">
                {backButtonDescription}
              </span>
            )}
            <Button
              variant="link"
              className="font-normal pl-0 text-blue-400"
              size="sm"
              asChild
            >
              <Link href={backButtonLink}>{backButtonTitle}</Link>
            </Button>
          </CardFooter>
        )}
      </Card>
      {login && (
        <div className="hidden lg:flex items-center mr-4 ">
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
