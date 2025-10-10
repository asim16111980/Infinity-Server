import nodemailer from "nodemailer";
import Handlebars from "handlebars";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const sendEmail = async (email, subject, payload, template) => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,  
        pass: process.env.EMAIL_PASS,    
      },
    });

    const source = fs.readFileSync(path.join(__dirname, template), "utf-8");
    const compiledTemplate = Handlebars.compile(source);

    const mailOptions = {
      from: `Infinity App <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html: compiledTemplate(payload),
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info.messageId);
    return { success: true, info };
  } catch (err) {
    console.error("Email error:", err);
    return { success: false, error: err };
  }
};
