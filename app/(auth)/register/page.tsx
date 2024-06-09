import LoginForm from "@/components/forms/login-form";
import RegisterForm from "@/components/forms/register-form";
import AuthWrapper from "@/components/wrappers/auth-wrapper";

export default function Register() {
  return (
    <AuthWrapper
      title="Create an Account"
      backButtonLink="/login"
      backButtonTitle="Don't have an account?"
      className="bg-[#313338] border-none"
     >
        <RegisterForm />
    </AuthWrapper>
  );
}
