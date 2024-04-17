import { useEffect, useState } from "react";
import { EventListByOrganizer } from "./EventsFunctions";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import UpdateEvent from "./UpdateEvent";
import DeleteEvent from "./DeleteEvent";
import '../Locations/LocationDetails.css'
import { FaTrash } from "react-icons/fa6";
import { RiPencilFill } from "react-icons/ri";


const MyEvents = () => {
  const iduser = useSelector(state => state.value);
  const [events, setEvents] = useState([]);
  const [showupdate, setShowupdate] = useState(false);
  const [showdelete, setShowdelete] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEventSaved, setIsEventSaved] = useState(false);

  const handleCloseDelete = () => setShowdelete(false);
  const handleCloseUpdate = () => setShowupdate(false);
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
  const handleShowUpdate = (event) => {
    setSelectedEvent(event);
    setShowupdate(true);
  };
  const handleShowDelete = (event) => {
    setSelectedEvent(event);
    setShowdelete(true);
  }
 
  const handleEventSaved = () => {
    setIsEventSaved(true);
  };

  return (
    <div className="bgbottoni coloretext">
     
      {events && events.map((event) => (
        <Card key={event.evento.id}  className='myeventscard coloretext bgmyevents d-flex flex-row p-1'>
          <div className="col-4">
            <Card.Img className="w-75" src={event.evento.immagine} />
          </div>
         
          <div className="col-8 ">
            <Card.Body >
              <Card.Title><div>Nome Evento: {event.evento.nome}</div>
                Presso: {event.nomeLocation}
                </Card.Title>
              <Card.Text >
                <div className="d-flex justify-content-between">
                  <p>Data:</p>
                  <p>{event.evento.data.split('T')[0]}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Ora:</p>
                  <p> {event.evento.data.split('T')[1]}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Biglietti disponibili:</p>
                  <p> {event.evento.bigliettiTotali}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Biglietti venduti:</p>
                  <p> {event.evento.bigliettiVenduti}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Prezzo:</p>
                  <p> {event.evento.prezzo} €</p>
                </div>
              </Card.Text>
          
          {/* <button className="btn " onClick={() => handleShowUpdate(event.evento)} >Modifica Evento</button>
            <button className="btn" onClick={() => handleShowDelete(event.evento)}> Elimina Evento</button> */}
            
              <div className="d-flex justify-content-end">
                <RiPencilFill onClick={() => handleShowUpdate(event.evento)} className="mx-2 bottoni"/>
                <FaTrash onClick={() => handleShowDelete(event.evento)} className="bottoni"/>
              
              </div>
            </Card.Body>
            </div>
          
        </Card>
      ))}
      <DeleteEvent show={showdelete} close={handleCloseDelete} onEventSaved={handleEventSaved} event={selectedEvent} />
      <UpdateEvent show={showupdate} close={handleCloseUpdate} onEventSaved={handleEventSaved} event={selectedEvent} />
    </div>

  );
};

export default MyEvents;
