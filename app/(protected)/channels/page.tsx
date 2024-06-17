import { InitialProfile } from "@/lib/initial-profile";
import { db } from "@/services/db";
import { redirect } from "next/navigation";

export default async function ChannelPage() {
  const profile = await InitialProfile();

  if (!profile) {
    return redirect("/login");
  }

  return redirect(`/channels/me`);
}
