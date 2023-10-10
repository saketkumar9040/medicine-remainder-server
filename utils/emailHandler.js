import { createTransport } from "nodemailer";

export const sendMail = async (email, subject, text) => {
  try {
    const transport = createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const send = await transport.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject,
      text,
    });
    console.log(send);
  } catch (error) {
    console.log(error.message);
  }
};
