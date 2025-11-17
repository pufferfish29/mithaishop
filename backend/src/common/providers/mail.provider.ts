import { Injectable } from "@nestjs/common";
import { Resend } from "resend";

@Injectable()
export class MailerService {
  private resend: Resend;
  private fromEmail: string;
  private fromName: string;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async send(options: { to: string; subject: string; html: string }) {
    try {
      const response = this.resend.emails.send({
        from: process.env.RESEND_FROM_USER,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });
      return response;
    } catch (error) {
      console.error("Error sending email via Resend:", error);
      throw error;
    }
  }
}
