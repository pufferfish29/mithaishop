import { Injectable } from "@nestjs/common";
import * as nodemailer from "nodemailer";

@Injectable()
export class MailerService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_PORT === "465",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async send(options: {
    to: string;
    subject: string;
    html: string;
  }): Promise<nodemailer.SentMessageInfo> {
    console.log("*********************9")

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const response = await this.transporter.sendMail({
        from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });
      console.log("*********************10")
      return response as unknown as nodemailer.SentMessageInfo;
    } catch (error) {
      console.error("Error sending email via Nodemailer:", error);
      throw error;
    }
  }
}
