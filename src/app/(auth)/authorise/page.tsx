import AuthoriseClient from "@/components/auth/authorise-client";

const AuthorisePage = async ({
  searchParams,
}: {
  searchParams: {
    token: string;
  };
}) => {
  return <AuthoriseClient token={searchParams!.token} />;
};

export default AuthorisePage;
