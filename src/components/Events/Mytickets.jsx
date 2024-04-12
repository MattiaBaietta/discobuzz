import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { EventListByUser } from "./EventsFunctions";



const Mytickets = () => {

    const iduser = useSelector(state => state.value);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await EventListByUser(iduser);
            setEvents(data);
        }
        fetchData();
    }, [iduser]);

    return(
        <>
            <div>
                I Miei Biglietti
            </div>
            <div>
                {events.map((event) => (
                    <div key={event.id}>
                        <h3>Nome location:{event.nomeLocation}</h3>
                        <p>Data:{event.data}</p>
                        <p>Biglietto numero:{event.codBiglietto}</p>
                        <p>Nome evento:{event.nomeEvento}</p>
                    </div>
                ))}
            </div>
        </>

        
    )

}
export default Mytickets