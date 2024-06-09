import LoginForm from "@/components/forms/login-form";
import AuthWrapper from "@/components/wrappers/auth-wrapper";

export default function Login() {
  return (
    <AuthWrapper
      title="Welcome Back!"
      description="We're so excited to see you again"
      backButtonLink="/register"
      backButtonTitle="Don't have an account?"
      className="bg-[#313338] border-none"
      login={true}
    >
      <LoginForm />
    </AuthWrapper>
  );
}
