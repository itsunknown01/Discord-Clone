import PasswordForm from "@/components/auth/password-form";
import AuthWrapper from "@/components/wrapper/auth-wrapper";
import React from "react";

const PasswordPage = ({
  searchParams,
}: {
  searchParams: { token: string };
}) => {
  return (
    <AuthWrapper
      className="bg-[#313338] border-none py-4 text-white w-[480px]"
      isAuthorise={true}
      title="Change Your Password"
    >
      <PasswordForm token={searchParams.token} />
    </AuthWrapper>
  );
};

export default PasswordPage;
