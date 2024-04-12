import { useEffect, useState } from "react";
import { EventListByOrganizer } from "./EventsFunctions";
import { useSelector } from "react-redux";

const MyEvents = () => {
    const iduser = useSelector(state => state.value);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const eventsData = await EventListByOrganizer(iduser);
                setEvents(eventsData);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, [iduser]);

    return (
        <div>
            <h1>My Events</h1>
            {events && events.map((event) => (
                <div key={event.evento.id}>
                    <h2>Nome Evento:{event.evento.nome}</h2>
                    <p>Descrizione:{event.evento.descrizione}</p>
                    <p>Data:{event.evento.data}</p>
                    <p>Prezzo:{event.evento.prezzo}</p>
                    <p>Biglietti Tot:{event.evento.bigliettiTotali}</p>
                    <p>Presso:{event.nomeLocation}</p>
                </div>
            ))}
        </div>
    );
};

export default MyEvents;
