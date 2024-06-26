import ConversationSidebar from "@/components/conversation/conversation-sidebar";

export default async function MeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ConversationSidebar friends={[]} profile={{}} />
      {children}
    </>
  );
}
