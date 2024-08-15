import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Section,
    Tailwind,
    Text
} from "@react-email/components";

interface VercelInviteUserEmailProps {
  username?: string;
  loginLink?: string;
  forgotPasswordLink?: string;
  isPassword: boolean,
  description: string;
  buttonText: string;
}

const baseUrl = process.env.VERCEL_URL ? `${process.env.VERCEL_URL}` : "";

export const VercelInviteUserEmail = ({
  username,
  loginLink,
  forgotPasswordLink,
  description,
  isPassword,
  buttonText
}: VercelInviteUserEmailProps) => {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/static/dicord-email-icon.png`}
                height="38"
                width="138"
                alt="discord"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal flex justify-center items-center p-0 my-[30px] mx-0"></Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Hey {username},
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
             {description}
            </Text>
            <Section>
              {!isPassword && (
              <Text className="text-black text-[14px] leading-[24px]">
                If this wasn’t you, click here to{" "}
                  <Link className="cursor-pointer" href={forgotPasswordLink}>
                    reset your password and logout all devices
                  </Link>
              </Text>
              )}
            </Section>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#5865f2] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={isPassword ? forgotPasswordLink : loginLink}
              >
                {buttonText}
              </Button>
            </Section>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Need help?
              <span className="underline text-blue-400">
                Contact our support team
              </span>
              or get in touch on Twitter
              <span className="underline text-blue-400">@Discord</span> Want to
              give us feedback? Let us know what you think on out
              <span className="underline text-blue-400">feedback.site</span>.
            </Text>
            <Text className="text-[#666666] text-[12px] leading-[24px] mt-7">
              Sent by Discord? -{" "}
              <span className="underline text-blue-400">
                Check our blog - @discord
              </span>
              444 De Haro Street, Sulie 200, San Francisco, CA 94107
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default VercelInviteUserEmail;
