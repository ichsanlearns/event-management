import cron from "node-cron";
import { expiredOrders } from "./expiredOrders.js";
import { autoConfirmOrders } from "./autoConfirmOrders.js";

export function startCronJobs() {
  cron.schedule("* * * * * *", () => {
    expiredOrders();
    autoConfirmOrders();
  });
}
