"use client";

import { sendVerificationEmail } from "@/email/mail";
import { Button } from "../ui/button";

export default function Test() {
  // const handleClick = async () => {
  //   await sendVerificationEmail({
  //       email:"rivoxi9745@polatrix.com",
  //       verificationToken: "adfadgag",
  //       userName: "Ayushman"
  //   })
  // } 
    return (
    <div>
      <Button>
         Send Email
      </Button>
    </div>
    )
}
