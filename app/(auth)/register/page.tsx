import RegisterForm from "@/components/forms/register-form";
import AuthWrapper from "@/components/wrapper/auth-wrapper";

export default function Register() {
  return (
    <AuthWrapper
      title="Create an Account"
      backButtonLink="/login"
      backButtonTitle="I already have an account?"
      className="bg-[#313338] border-none"
    >
      <RegisterForm />
    </AuthWrapper>
  );
}