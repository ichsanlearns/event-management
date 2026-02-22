import cron from "node-cron";
import { autoChangeEventDone } from "./autoChangeEventDone.js";
import { autoExpirePaymentOrders } from "./autoExpiredPaymentOrders.js";
import { autoExpireConfirmOrders } from "./autoExpireConfirmOrders.js";

export function startCronJobs() {
  cron.schedule("* * * * * *", () => {
    autoExpirePaymentOrders();
    autoChangeEventDone();
    autoExpireConfirmOrders();
  });
}
