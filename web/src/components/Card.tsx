import {useState, useEffect} from "react";

import { type TEvent } from "../types/event.type";

function Card() {
    const [events, setEvents] = useState<TEvent[] | null>(null);

    useEffect(() => {
        async function getEvents(){
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/events`,{method: "GET"});
                const data = await response.json();

                setEvents(data.data);
            } catch (error) {
                console.error(error);
            }
        }
        getEvents();
    }, []);

    return (
        <div>
            <h1 className="text-center underline">Card</h1>
            {events ? (events?.map((event)=>(
                <div key={event.id} className="border border-gray-300 p-4">{event.name}</div>
            ))): <p>Loading user data...</p>}
        </div>
    )
}
export default Card;