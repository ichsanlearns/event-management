import cron from "node-cron";
import { autoChangeEventDone } from "../features/order/job/autoChangeEventDone.js";
import { autoExpirePaymentOrders } from "../features/order/job/autoExpiredPaymentOrders.js";
import { autoExpireConfirmOrders } from "../features/order/job/autoExpireConfirmOrders.js";

export function startCronJobs() {
  cron.schedule("* * * * * *", () => {
    autoExpirePaymentOrders();
    autoChangeEventDone();
    autoExpireConfirmOrders();
  });
}
