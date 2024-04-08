
import { useLocation } from "react-router-dom"
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Location } from "./LocationsFunctions";
import MapComponent from "../Layout/Map/MapComponent";
import { Button } from 'react-bootstrap';
import CreateEvent from "../Events/CreateEvent";
import UpdateEvent from "../Events/UpdateEvent";
import DeleteEvent from "../Events/DeleteEvent";
import { EventsListByLocation } from "../Events/EventsFunctions";
import ModifyLocation from "./ModifyLocation";



const LocationDetails = () => {
const {id}=useParams();

const [show, setShow] = useState(false);
const [showupdate, setShowupdate] = useState(false);
const [Showmodiy, setShowmodify] = useState(false);
const [isEventSaved, setIsEventSaved] = useState(false);
const [selectedEvent, setSelectedEvent] = useState(null);
const [showdelete, setShowdelete] = useState(false);
const handleShow = () => setShow(true);
const handleShowModify = () => setShowmodify(true);
const handleCloseModify = () => setShowmodify(false);

const handleShowUpdate = (event) => { // Funzione per gestire l'apertura della modale di aggiornamento con l'evento selezionato
  setSelectedEvent(event);
  setShowupdate(true);
};
const handleShowDelete = (event) => {
  setSelectedEvent(event);
  setShowdelete(true);
}
const handleCloseDelete = () => setShowdelete(false);
const handleCloseUpdate = () => setShowupdate(false);
const handleClose = () => setShow(false);

const [location, setLocation] = useState(null);
const [events, setEvents] = useState(null);


  useEffect(() => {
    EventsListByLocation(id).then((data) => {
      setEvents(data);
    });
    Location(id).then((data) => {
      setLocation(data);
    });
    setIsEventSaved(false);
    console.log("event saved?"+isEventSaved)
  }, [id, isEventSaved]);

  const handleEventSaved = () => {
    setIsEventSaved(true);
    
  };

  if (location === null) {
    return <div>Loading...</div>;
  }
  return(
    
    <div>
      <h1>Dettagli Location</h1>
        <div className='d-flex'>  
          <div className='d-flex flex-column'>
            <label>Nome: {location[0].nome}</label>
            <label>Indirizzo: {location[0].indirizzo}</label>
            <Button  onClick={handleShowModify}>Modifica</Button>
            <ModifyLocation 
              show={Showmodiy} 
              close={handleCloseModify} 
              indirizzo={location[0].indirizzo}
              locations={location} 
              initialLatitude={location[0].latitudine} 
              initialLongitude={location[0].longitudine} 
              nome={location[0].nome}
              id={location[0].id}
              onEventSaved={handleEventSaved}
            />
          </div>

        </div>
        
        <MapComponent
        key={`${location[0].latitudine}-${location[0].longitudine}`}
         isEventSaved={isEventSaved} 
         locations={location} 
         initialLatitude={location[0].latitudine} 
         initialLongitude={location[0].longitudine}/>
        

        <div>

          <div className='d-flex'>
          
            <div>
            
            <CreateEvent show={show} close={handleClose} onEventSaved={handleEventSaved} idlocation={id} ></CreateEvent>
            {/* //TODO:Aggiungre la funzione per l'immagine dell'evento */}
              Eventi Programmati:
            {events && events.map((event, index) => (
              <div key={index} className=''>
                <label>Nome: {event.nome}</label>
                <label>Dettagli: {event.dettagli}</label>
                <label>Data: {event.data}</label>
                <label>Biglietti disponibili: {event.bigliettiTotali}</label>
                <label>Biglietti venduti:{event.bigliettiVenduti}</label>
                <label>Prezzo: {event.prezzo} €</label>
                <Button onClick={() => handleShowUpdate(event)} >Modifica Evento</Button>
                <Button onClick={()=>handleShowDelete(event)}> Elimina Evento</Button>                
              </div>
            ))}
            <Button onClick={handleShow}>Crea nuovo evento</Button> 
            </div>
            <DeleteEvent show={showdelete} close={handleCloseDelete} onEventSaved={handleEventSaved} event={selectedEvent} />
            <UpdateEvent show={showupdate} close={handleCloseUpdate} onEventSaved={handleEventSaved} idlocation={id} event={selectedEvent} />
          </div>
        </div>
    </div>
    
  )
}

export default LocationDetails;