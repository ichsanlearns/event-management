import { Router } from "express";
import { sendEmail } from "../utils/email.util.js";

const router = Router();

router.get("/test-email", async (req, res) => {
  await sendEmail("fajarwn474@gmail.com", "Test Email", "<h1>Email berhasil terkirim</h1>");

  res.json({ message: "email sent" });
});

export default router;
