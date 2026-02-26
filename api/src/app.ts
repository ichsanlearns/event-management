import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import cors from "cors";
import path from "path";

import authRoutes from "./features/auth/auth.route.js";
import eventRoutes from "./features/event/event.route.js";
import userRoutes from "./features/user/user.route.js";
import orderRoutes from "./features/order/order.route.js";
import paymentRoutes from "./features/payment/payment.route.js";
import voucherRoutes from "./features/voucher/voucher.route.js";
import reviewRoutes from "./features/review/review.route.js";
import approvalRoutes from "./features/approval/approval.route.js";
import { startCronJobs } from "./scheduler/cron.js";
import { notFound } from "./shared/middleware/not-found.middleware.js";
import { error } from "./shared/middleware/error.middleware.js";

const app: Application = express();
const PORT: number = 8000;

app.use(express.json());
app.use(cors({ origin: `${process.env.WEB_URL}` }));

app.get("/favicon.ico", (req, res) => res.status(204).end());

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
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api/reviews", reviewRoutes);
app.use("/api/approval", approvalRoutes);

app.use(notFound);
app.use(error);

app.listen(PORT, () => {
  console.info(`Server is listening on port: ${PORT}`);
  startCronJobs();
});

export default app;
