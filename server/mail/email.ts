import {
  generatePasswordResetEmailHtml,
  generateResetSuccessEmailHtml,
  generateWelcomeEmailHtml,
  htmlContent,
} from "./htmlEmail";
import { client, sender } from "./mailTrap";
export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
  const recipients = [
    {
      email,
    },
  ];
  try {
    const res = await client.send({
      from: sender,
      to: recipients,
      subject: "Food App - Verify Your Email",
      html: htmlContent.replace("{verificationToken}", verificationToken),
      category: "Verification Email",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send verification email");
  }
};
export const sendWelcomeEmail = async (email: string, name: string) => {
  const recipients = [
    {
      email,
    },
  ];
  const htmlContent = generateWelcomeEmailHtml(name);
  try {
    const res = await client.send({
      from: sender,
      to: recipients,
      subject: "Welcome to Food App",
      html: htmlContent,
      template_variables: {
        company_info_name: "Food App",
        name: name,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send welcome email");
  }
};
export const sendPasswordResetEmail = async (
  email: string,
  resetURL: string
) => {
  const recipients = [
    {
      email,
    },
  ];
  const htmlContent = generatePasswordResetEmailHtml(resetURL);
  try {
    const res = await client.send({
      from: sender,
      to: recipients,
      subject: "Reset Your Password",
      html: htmlContent,
      category: "Password Reset",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send password reset email");
  }
};
export const sendResetSuccessEmail = async (email: string) => {
  const recipients = [
    {
      email,
    },
  ];
  const htmlContent = generateResetSuccessEmailHtml();
  try {
    const res = await client.send({
      from: sender,
      to: recipients,
      subject: "Password Reset Successful",
      html: htmlContent,
      category: "Password Reset",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send password reset success email");
  }
};
