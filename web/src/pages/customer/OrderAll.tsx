import { useEffect, useState } from "react";
import { getOrderByCustomer } from "../../services/order.service";
import toast from "react-hot-toast";
import type { Order } from "../../api/types";
import Paid from "../../components/order/Paid";
import Expired from "../../components/order/Expired";
import Rejected from "../../components/order/Rejected";
import Canceled from "../../components/order/Canceled";
import Done from "../../components/order/Done";

function OrderAll() {
  const [events, setEvents] = useState<Order[]>([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await getOrderByCustomer(
          "54dbb77d-8ad0-4df0-981f-f9de9d1ef9fd",
          "all",
        );
        setEvents(res.data);
        toast.success("Event fetched successfully");
      } catch (error: any) {
        toast.error(error.message || "Failed to fetch event");
      }
    };
    fetchEvent();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        {events.map((event: Order) =>
          event.status.toLowerCase() === "paid" ? (
            <Paid key={event.id} data={event} />
          ) : event.status.toLowerCase() === "expired" ? (
            <Expired key={event.id} data={event} />
          ) : event.status.toLowerCase() === "rejected" ? (
            <Rejected key={event.id} data={event} />
          ) : event.status.toLowerCase() === "canceled" ? (
            <Canceled key={event.id} data={event} />
          ) : (
            <Done key={event.id} data={event} />
          ),
        )}
      </div>
    </div>
  );
}

export default OrderAll;
