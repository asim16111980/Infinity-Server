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
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      },
    });

    const sourceTemplate = fs.readFileSync(
      path.join(__dirname, template),
      "utf-8"
    );
    const compiledTemplate = Handlebars.compile(sourceTemplate);

    const options = () => {
      return {
        from: `Infinity App <noreplay@infinity.com>`,
        to: email,
        subject: subject,
        html: compiledTemplate(payload),
      };
    };

    transporter.sendMail(options(), (error, info) => {
      if (error) {
        return error;
      } else {
        return res.status(200).json({
          success: true,
        });
      }
    });
  } catch (err) {
    return err;
  }
};
