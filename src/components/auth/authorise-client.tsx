"use client";

import Link from "next/link";
import { useEffect } from "react";

// import { newVerficationToken } from "@/actions/verification-token";
// import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import AuthWrapper from "../wrapper/auth-wrapper";

const AuthoriseClient = ({ token }: { token: string }) => {
  // const { isPending, isSuccess, mutate } = useMutation({
  //   mutationFn: () => newVerficationToken(token),
  // });

  // useEffect(() => {
  //   mutate();
  // }, [mutate]);

  // const title = isSuccess ? "User Authorised" : "User Not Authorised";
  const description =
    "If you followed this link after trying to log in on the desktop or mobile app, please go back and try again.";

  // Todo spinner animation
  // return isPending ? 
  // (
  //   <div>Loading...</div>
  // ) : 
 return (
    <AuthWrapper
      className="bg-[#313338] border-none p-4 text-white"
      title={""}
      description={description}
      isAuthorise={true}
    >
      <div className="space-y-2 mt-8">
        <Button className="w-full" asChild>
          <Link href={"/login"}>Login</Link>
        </Button>
      </div>
    </AuthWrapper>
  );
};

export default AuthoriseClient;
