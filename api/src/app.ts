import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import eventRoutes from "./routes/event.route.js";
import userRoutes from "./routes/user.route.js";
import orderRoutes from "./routes/order.route.js";
import paymentRoutes from "./routes/payment.route.js";
import voucherRoutes from "./routes/voucher.route.js";
import { startCronJobs } from "./jobs/cron.js";

const app: Application = express();
const PORT: number = 8000;

app.use(express.json());
app.use(cors({ origin: `${process.env.WEB_URL}` }));

app.get("/api/status", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "API is running!", uptime: process.uptime() });
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/user", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/vouchers", voucherRoutes);

app.listen(PORT, () => {
  console.info(`Server is listening on port: ${PORT}`);
  startCronJobs();
});

export default app;
