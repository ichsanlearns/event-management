import { useState, useEffect } from "react";

import { useParams } from "react-router";

import type { TEvent } from "../types/event.type";

function Event() {
  const params = useParams();

  const [event, setEvent] = useState<TEvent | null>(null);

  useEffect(() => {
    async function getEventById() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/events/${params.id}`,
        );
        const data = await response.json();

        setEvent(data.data);
      } catch (error) {
        console.error(error);
      }
    }

    getEventById();
  });

  return (
    <main>
      <div className="h-screen">
        <img
          alt="Workshop setting"
          className="w-screen h-[50%] object-cover"
          src={event?.image}
        />
        <h1>{event?.name}</h1>
        <div>{event?.city}</div>
      </div>
    </main>
  );
}

export default Event;
