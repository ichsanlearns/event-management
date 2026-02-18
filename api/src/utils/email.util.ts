import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "node:path";
import { fileURLToPath } from "url";

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_USER),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const transporterEvent = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_USER),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporterEvent.use(
  "compile",
  hbs({
    viewEngine: {
      extname: ".hbs",
      partialsDir: path.resolve(__dirname, "../templates"),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, "../templates"),
    extName: ".hbs",
  }),
);

export const transporterTransaction = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendEmail(to: string, subject: string, html: string) {
  await transporter.sendMail({
    from: `"Event System" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}
