import { useEffect, useState } from "react";
import { EventListByOrganizer } from "./EventsFunctions";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import UpdateEvent from "./UpdateEvent";
import DeleteEvent from "./DeleteEvent";
import '../Locations/LocationDetails.css'
import { FaTrash } from "react-icons/fa6";
import { RiPencilFill } from "react-icons/ri";
import { ToastContainer } from "react-toastify";


const MyEvents = () => {
  const iduser = useSelector(state => state.value.userId);
  console.log(iduser)
  
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
    setIsEventSaved(false);
  }, [iduser,isEventSaved]);
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
     <ToastContainer/>
      <div  >
        {events && events.map((event) => (
          <Card key={event.evento.id}  className='  rounded-0 myeventscard coloretext bgmyevents d-flex flex-row p-1'>
            <div className="col-4">
              <Card.Img className="w-75" src={event.evento.immagine} />
            </div>
           
            <div className="col-6 justify-content-center " >
              <Card.Body  className="p-0 mx-5">
                <Card.Title><div>Nome Evento: {event.evento.nome}</div>
                  Presso: {event.nomeLocation}
                  </Card.Title>
                <Card.Text className="  " >
                  <div className="d-flex fs-5 justify-content-between">
                    <p>Data:</p>
                    <p>{event.evento.data.split('T')[0]}</p>
                  </div>
                  <div className="d-flex fs-5 justify-content-between">
                    <p>Ora:</p>
                    <p> {event.evento.data.split('T')[1]}</p>
                  </div>
                  <div className="d-flex  fs-5 justify-content-between">
                    <p>Biglietti disponibili:</p>
                    <p> {event.evento.bigliettiTotali}</p>
                  </div>
                  <div className="d-flex fs-5 justify-content-between">
                    <p>Biglietti venduti:</p>
                    <p> {event.evento.bigliettiVenduti}</p>
                  </div>
                  <div className="d-flex fs-5 justify-content-between">
                    <p>Prezzo:</p>
                    <p> {event.evento.prezzo} €</p>
                  </div>
                </Card.Text>
                
              </Card.Body>
             
              </div>
              <div className="col-2 d-flex justify-content-end">
                  <RiPencilFill style={{fontSize:"2em"}} onClick={() => handleShowUpdate(event.evento)} className="mx-2 bottoneeventi"/>
                  <FaTrash style={{fontSize:"2em"}} onClick={() => handleShowDelete(event.evento)} className="bottoneeventi"/>
                
                </div>
            
          </Card>
        ))}
        <DeleteEvent show={showdelete} close={handleCloseDelete} onEventSaved={handleEventSaved} event={selectedEvent} />
        <UpdateEvent show={showupdate} close={handleCloseUpdate} onEventSaved={handleEventSaved} event={selectedEvent} />
      </div>
  
      </div>
  );
};

export default MyEvents;
