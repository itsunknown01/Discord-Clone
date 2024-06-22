import LoginForm from "@/components/forms/login-form";
import AuthWrapper from "@/components/wrapper/auth-wrapper";

export default async function LoginPage() {
  return (
    <AuthWrapper
      title="Welcome Back!"
      description="We're so excited to see you again"
      backButtonLink="/register"
      backButtonTitle="Don't have an account?"
      className="bg-[#313338] border-none p-4"
      login={true}
    >
      <LoginForm />
    </AuthWrapper>
  );
}