import cron from "node-cron";
import { checkExpiredOrders } from "./expiredOrders.js";

export function startCronJobs() {
  cron.schedule("* * * * * *", () => {
    checkExpiredOrders();
  });
}
