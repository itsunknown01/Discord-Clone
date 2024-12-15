import RegisterForm from "@/components/auth/register-form";
import AuthWrapper from "@/components/wrapper/auth-wrapper";

export default function Register() {
  return (
    <AuthWrapper
      title="Create an Account"
      backButtonLink="/login"
      backButtonTitle="Already have an account?"
      className="bg-[#313338] border-none w-[480px]"
    >
      <RegisterForm />
    </AuthWrapper>
  );
}