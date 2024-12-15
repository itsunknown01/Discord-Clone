import LoginForm from "@/components/auth/login-form";
import AuthWrapper from "@/components/wrapper/auth-wrapper";

export default async function LoginPage() {
  return (
    <AuthWrapper
      title="Welcome Back!"
      description="We're so excited to see you again"
      backButtonLink="/register"
      backButtonTitle="Register"
      backButtonDescription="Need an account?"
      className="bg-[#313338] text-white relative border-none p-4"
      login={true}
    >
      <LoginForm />
    </AuthWrapper>
  );
}