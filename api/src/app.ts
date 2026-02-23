import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route";
import eventRoutes from "./routes/event.route";
import userRoutes from "./routes/user.route";
import orderRoutes from "./routes/order.route";
import paymentRoutes from "./routes/payment.route";
import voucherRoutes from "./routes/voucher.route";
import reviewRoutes from "./routes/review.route";
import approvalRoutes from "./routes/approval.route";
import { startCronJobs } from "./jobs/cron";
import { notFound } from "./middleware/not-found.middleware";
import { error } from "./middleware/error.middleware";

const app: Application = express();
const PORT: number = 8000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
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
