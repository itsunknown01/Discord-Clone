import Test from "@/components/test/test";
import { InitialProfile } from "@/lib/profile/initial-profile";
import { redirect } from "next/navigation";

export default async function SetupPage() {
  const profile = await InitialProfile();

  if (!profile) {
    return redirect("/login");
  }

  return redirect("/channels/me");
  }
