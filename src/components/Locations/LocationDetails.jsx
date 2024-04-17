
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Location } from "./LocationsFunctions";
import MapComponent from "../Layout/Map/MapComponent";
import { Button } from 'react-bootstrap';
import { FaTrash } from "react-icons/fa6";
import CreateEvent from "../Events/CreateEvent";
import UpdateEvent from "../Events/UpdateEvent";
import DeleteEvent from "../Events/DeleteEvent";
import { EventsListByLocation } from "../Events/EventsFunctions";
import ModifyLocation from "./ModifyLocation";
import { RiPencilFill } from "react-icons/ri";
import { RemoveLocation } from "./LocationsFunctions";
import { useNavigate } from "react-router-dom";
import "./LocationDetails.css";
import Card from 'react-bootstrap/Card';


const LocationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showupdate, setShowupdate] = useState(false);
  const [Showmodiy, setShowmodify] = useState(false);
  const [isEventSaved, setIsEventSaved] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showdelete, setShowdelete] = useState(false);
  const handleShow = () => setShow(true);
  const handleShowModify = () => setShowmodify(true);
  const handleCloseModify = () => setShowmodify(false);

  const handleShowUpdate = (event) => {
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
  }, [id, isEventSaved]);

  const handleEventSaved = () => {
    setIsEventSaved(true);
  };

  const handleRemove = async () => {
    await RemoveLocation(id);
    navigate('/Mylocations');
    setIsEventSaved(true);
  }

  if (location === null) {
    return <div>Loading...</div>;
  }
  return (

    <div className=" bgbottoni">
      <div className="locationdetails" >
      
        <div className='d-flex '>
          <img className="w-50 immagini" src={location[0].immagine}></img>
          <div className="coloretext p-5 w-50 d-flex flex-column justify-content-between align-items-center">
            <div>
              <p style={{ fontSize: "2em", fontWeight: "bold" }}>Nome: {location[0].nome}</p>
              <p>Indirizzo: {location[0].indirizzo}</p>
            </div>
            <div className="d-flex align-self-end">
              {/* <button className="px-2 btn mx-2" onClick={handleShowModify}>Modifica location</button>
              <button className=" btn" onClick={handleRemove}>Elimina location</button> */}
              <RiPencilFill onClick={handleShowModify} className="mx-2 bottoni"/>
              <FaTrash onClick={handleRemove} className="bottoni "/>
              
            </div>
            
          </div>
          <ModifyLocation

            show={Showmodiy}
            close={handleCloseModify}
            indirizzo={location[0].indirizzo}
            locations={location}
            initialLatitude={location[0].latitudine}
            initialLongitude={location[0].longitudine}
            Immagine={location[0].immagine}
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
        initialLongitude={location[0].longitudine} />



      <div className="coloretext eventidet">
      <h2 className="py-5">Eventi Programmati:
            
      </h2>
      <button className="btn my-2" onClick={handleShow}>Aggiungi nuovo evento</button>
        <div className='d-flex'>
        
          <div className="row m-0 ">

            <CreateEvent show={show} close={handleClose} onEventSaved={handleEventSaved} idlocation={id} ></CreateEvent>
            {/* //TODO:Aggiungre la funzione per l'immagine dell'evento */}
            
            {events && events.map((event, index) => (
              <Card key={index} className='eventicard coloretext bgcustom col-3 p-1'>
                <Card.Img src={event.immagine}/>
                <Card.Body>
                  <Card.Title>{event.nome}</Card.Title>
                  <Card.Text>
                    <div className="d-flex justify-content-between">
                      <p>Data:</p> 
                      <p>{event.data.split('T')[0]}</p>
                      </div>
                   <div className="d-flex justify-content-between">
                     <p>Ora:</p>
                     <p> {event.data.split('T')[1]}</p>
                     </div>
                    <div className="d-flex justify-content-between">
                      <p>Biglietti disponibili:</p>
                      <p> {event.bigliettiTotali}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Biglietti venduti:</p>
                      <p> {event.bigliettiVenduti}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Prezzo:</p>
                      <p> {event.prezzo} €</p>
                    </div>
                  </Card.Text>
                </Card.Body>
                  <div className="pb-2 d-flex  justify-content-between">
                    <button className="btn p-2" onClick={() => handleShowUpdate(event)} >Modifica Evento</button>
                    <button className="btn" onClick={() => handleShowDelete(event)}> Elimina Evento</button>
                  </div>
              </Card>
            ))}
            
          </div>
          <DeleteEvent show={showdelete} close={handleCloseDelete} onEventSaved={handleEventSaved} event={selectedEvent} />
          <UpdateEvent show={showupdate} close={handleCloseUpdate} onEventSaved={handleEventSaved} event={selectedEvent} />
        </div>
      </div>
    </div>

  )
}

export default LocationDetails;