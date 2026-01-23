import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import authRoutes from "./routes/auth.route.js";

const app: Application = express();
const PORT: number = 8000;

app.use(express.json());

app.get("/api/status", (req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "API is running!", uptime: process.uptime() });
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => console.info(`Server is listening on port: ${PORT}`));

export default app;
