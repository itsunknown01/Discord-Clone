import PasswordForm from "@/components/forms/password-form";
import AuthWrapper from "@/components/wrapper/auth-wrapper";
import React from "react";

const PasswordPage = ({
  searchParams,
}: {
  searchParams: { token: string };
}) => {
  return (
    <AuthWrapper
      className="bg-[#313338] border-none p-4 text-white"
      isAuthorise={true}
      title="Change Your Password"
    >
      <PasswordForm token={searchParams.token} />
    </AuthWrapper>
  );
};

export default PasswordPage;
