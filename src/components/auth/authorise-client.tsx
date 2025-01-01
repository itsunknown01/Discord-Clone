"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { Button } from "../ui/button";
import AuthWrapper from "../wrapper/auth-wrapper";
import { getMethodhelper, putMethodhelper } from "@/helpers";

const AuthoriseClient = ({ token }: { token: string }) => {
  const { isPending, isSuccess, mutate } = useMutation({
    mutationFn: () => putMethodhelper(`/api/auth/authorize`, { token }),
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  const title = isSuccess ? "User Authorised" : "User Not Authorised";
  const description =
    "If you followed this link after trying to log in on the desktop or mobile app, please go back and try again.";

  // Todo spinner animation
  return isPending ? (
    <div>Loading...</div>
  ) : (
    <AuthWrapper
      className="bg-[#313338] border-none py-4 w-[480px] text-white"
      title={title}
      description={description}
      isAuthorise={true}
    >
      <div className="space-y-2 mt-8">
        <Button className="w-full bg-blue-600 hover:bg-blue-600" asChild>
          <Link href={"/login"}>Login</Link>
        </Button>
      </div>
    </AuthWrapper>
  );
};

export default AuthoriseClient;
