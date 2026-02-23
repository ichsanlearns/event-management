import cron from "node-cron";
import { autoChangeEventDone } from "./autoChangeEventDone";
import { autoExpirePaymentOrders } from "./autoExpiredPaymentOrders";
import { autoExpireConfirmOrders } from "./autoExpireConfirmOrders";

export function startCronJobs() {
  cron.schedule("* * * * * *", () => {
    autoExpirePaymentOrders();
    autoChangeEventDone();
    autoExpireConfirmOrders();
  });
}
