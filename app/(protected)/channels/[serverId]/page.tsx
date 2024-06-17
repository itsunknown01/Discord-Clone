import { currentProfile } from "@/lib/current-profile";
import { db } from "@/services/db";
import { redirect } from "next/navigation";

interface ServerPageProps {
  params: {
    serverId: string;
  };
}

const ServerPage = async ({ params }: ServerPageProps) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect('/login');
  }

  const server = await db.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
    include: {
      channels: {
        where: {
          name: "general",
        },
      },
    },
  });

  const initialChannel = server?.channels[0];

  if (initialChannel?.name !== "general") {
    return null;
  }
  return redirect(
    `/channels/${params.serverId}/${initialChannel.id}`
  );
};

export default ServerPage;