import { Injectable } from "@nestjs/common";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

@Injectable()
export class MailerService {
  private mailer: MailerSend;
  private fromEmail: string;
  private fromName: string;

  constructor() {
    this.mailer = new MailerSend({
      apiKey:
        "mlsn.7c5e878216e626d2ef6d32b4e7de7d9e673bd0d73f31ef07f98bd1766c69caa6",
    });
    this.fromEmail = "hifaji5477@wivstore.com";
    this.fromName = "mithai";
  }

  async send(options: {
    to: string;
    subject: string;
    text?: string;
    html?: string;
    replyToEmail?: string;
    replyToName?: string;
  }) {
    const sentFrom = new Sender(this.fromEmail, this.fromName);
    const recipients = [new Recipient(options.to, options.to.split("@")[0])];
    console.log(this.fromEmail);

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(
        new Sender(
          options.replyToEmail || this.fromEmail,
          options.replyToName || this.fromName,
        ),
      )
      .setSubject(options.subject)
      .setHtml(options.html || options.text || "")
      .setText(options.text || "");

    const result = await this.mailer.email.send(emailParams);
    return result;
  }
}
