//const { MailtrapClient } = require("mailtrap");
import { MailtrapClient } from "mailtrap";
//const TOKEN = "9ee5c990a1f7ed7cb43ccced2352ffba";
//const ENDPOINT = "https://send.api.mailtrap.io/";
import dotenv from "dotenv";
dotenv.config();
export const client = new MailtrapClient({
  token: process.env.MAILTRAP_API_TOKEN!,
});

export const sender = {
  email: "hello@demomailtrap.com",
  //email: "mailtrap@demomailtrap.com"
  name: "Nguyen Van Dung",
};
// const recipients = [
//   {
//     email: "nguyenvandung03072003@gmail.com",
//   },
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "You are awesome!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);
