import { render } from "@react-email/components";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import Email from "@/email";

interface EmailProps {
  email: string;
  verificationToken?: string;
  passwordToken?: string;
  userName: string;
}

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT as string),
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendPasswordEmail = async ({
  email,
  passwordToken,
  userName,
}: EmailProps) => {
  const url = "http://localhost:3000";
  const passwordLink = `${url}/password?token=${passwordToken}`;
 
  const emailHtml = await render(
    Email({
      username: userName,
      forgotPasswordLink: passwordLink,
      description: "Your Discord password can be reset by clicking the button below. If you did not request a new password, please ignore this email.",
      isPassword: true,
      buttonText: "Reset Password"
    }))

  try {
    var mailOptions: Mail.Options = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: "Password reset request for Discord",
      html: emailHtml,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch(error) {
    console.error(error);
  }
}

export const sendVerificationEmail = async ({
  email,
  verificationToken,
  passwordToken,
  userName,
}: EmailProps) => {
  const url = "http://localhost:3000";
  const loginLink = `${url}/authorise?token=${verificationToken}`;
  const passwordLink = `${url}/password?token=${passwordToken}`;
  const emailHtml = await render(
    Email({
      username: userName,
      loginLink: loginLink,
      forgotPasswordLink: passwordLink,
      description: " Someone tried to log in to your Discord account from a new location. If this is you, click the link below to authorise the log in",
      isPassword: false,
      buttonText: "Verify Login"
    })
  );
  try {
    var mailOptions: Mail.Options = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: "Email verification for Discord",
      html: emailHtml,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.error(error);
  }
};
