// import nodemailer from "nodemailer";
// import hbs from "nodemailer-express-handlebars";
// import path from "node:path";

// export const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: Number(process.env.EMAIL_USER),
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// const __dirname = path.resolve();

// export const transporterEvent = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: Number(process.env.EMAIL_USER),
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// transporterEvent.use(
//   "compile",
//   hbs({
//     viewEngine: {
//       extname: ".hbs",
//       partialsDir: path.resolve(__dirname, "../templates"),
//       defaultLayout: false,
//     },
//     viewPath: path.resolve(__dirname, "../templates"),
//     extName: ".hbs",
//   }),
// );

// export const transporterTransaction = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// export async function sendEmail(to: string, subject: string, html: string) {
//   await transporter.sendMail({
//     from: `"Event System" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     html,
//   });
// }

import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

const __dirname = path.resolve();

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_USER),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const transporterEvent = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
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
      partialsDir: path.resolve(__dirname, "src/templates"),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, "src/templates"),
    extName: ".hbs",
  }),
);

export async function sendEmail(to: string, subject: string, html: string) {
  await transporter.sendMail({
    from: `"Event System" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  });
}
