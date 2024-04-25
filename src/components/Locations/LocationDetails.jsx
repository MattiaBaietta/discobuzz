// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Location } from "./LocationsFunctions";
// import MapComponent from "../Layout/Map/MapComponent";
// import { FaTrash } from "react-icons/fa6";
// import CreateEvent from "../Events/CreateEvent";
// import UpdateEvent from "../Events/UpdateEvent";
// import DeleteEvent from "../Events/DeleteEvent";
// import { EventsListByLocation } from "../Events/EventsFunctions";
// import ModifyLocation from "./ModifyLocation";
// import { RiPencilFill } from "react-icons/ri";
// import { RemoveLocation } from "./LocationsFunctions";
// import { useNavigate } from "react-router-dom";
// import "./LocationDetails.css";
// import Card from 'react-bootstrap/Card';
// import { Carousel } from "react-bootstrap";
// import { useSelector } from "react-redux";
// import { FaCartPlus } from "react-icons/fa";
// import { ToastContainer,toast } from "react-toastify";


// const LocationDetails = () => {
//   const [quantities, setQuantities] = useState({});
//   const { id } = useParams();
//   var role = parseInt(useSelector(state => state.role));
//   const navigate = useNavigate();
//   const [show, setShow] = useState(false);
//   const [showupdate, setShowupdate] = useState(false);
//   const [Showmodiy, setShowmodify] = useState(false);
//   const [isEventSaved, setIsEventSaved] = useState(false);
//   const [isEventDeleted, setIsEventDeleted] = useState(false);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [showdelete, setShowdelete] = useState(false);
//   const handleShow = () => setShow(true);
//   const handleShowModify = () => setShowmodify(true);
//   const handleCloseModify = () => setShowmodify(false);


//   const handleQuantityChange = (event, eventId) => {
//     const newQuantities = { ...quantities, [eventId]: event.target.value };
//     setQuantities(newQuantities);
//   };

//   const addToCart = (eventId) => {
//     let quantity = 0;
//     if (quantities[eventId] === undefined) {
//       quantity = 1;
//     }
//     else {
//       quantity = quantities[eventId];
//     }
//     console.log(quantity)
//     if (quantity && quantity > 0) {
//       const cart = localStorage.getItem("Cart");
//       const cartArray = cart ? JSON.parse(cart) : [];
//       for (let i = 0; i < quantity; i++) {
//         cartArray.push(eventId);
//       }
//       localStorage.setItem("Cart", JSON.stringify(cartArray));
//     }
//     setQuantities({});
//   };

//   const handleShowUpdate = (event) => {
//     setSelectedEvent(event);
//     setShowupdate(true);
//   };
//   const handleShowDelete = (event) => {
//     setSelectedEvent(event);
//     setShowdelete(true);
//   }
//   const handleCloseDelete = () => setShowdelete(false);
//   const handleCloseUpdate = () => setShowupdate(false);
//   const handleClose = () => setShow(false);

//   const [location, setLocation] = useState(null);
//   const [events, setEvents] = useState(null);


//   useEffect(() => {
//     EventsListByLocation(id).then((data) => {
//       setEvents(data);
//     });
//     Location(id).then((data) => {
//       setLocation(data);
//     });
//     setIsEventSaved(false);
//   }, [id, isEventSaved]);

//   const handleEventSaved = () => {
//     setIsEventSaved(true);
//   };

//   const handleRemove = () => {
//     RemoveLocation(id)
//         .then(() => { 
            
//             localStorage.setItem("toastDelete", "true");
            
//             navigate('/MyLocations');
//             setIsEventSaved(true);
//         })
//         .catch(error => {
//             toast.error("Si è verificato un errore durante la rimozione della location!");
//         });
// }

//   if (location === null) {
//     return <div>Loading...</div>;
//   }
//   return (

//     <div className=" bgbottoni">
//       <div className="locationdetails" >

//         <div className='row '>
//           <img className="col-lg col immagini " src={location[0].immagine}></img>
//           <div className="col-lg col coloretext p-4 d-flex flex-column justify-content-between align-items-center">
//             <div>
//               <p style={{ fontSize: "2em", fontWeight: "bold" }}>{location[0].nome}</p>
//               <p> {location[0].indirizzo}</p>
//             </div>
//             <div className="d-flex align-self-end">
//               {role == 1 &&
//                 <>
//                   <RiPencilFill onClick={handleShowModify} className="mx-2 bottoni" />
//                   <FaTrash onClick={handleRemove} className="bottoni " />
//                 </>
//               }
//             </div>
//           </div>
//           <ModifyLocation
//             show={Showmodiy}
//             close={handleCloseModify}
//             indirizzo={location[0].indirizzo}
//             locations={location}
//             initialLatitude={location[0].latitudine}
//             initialLongitude={location[0].longitudine}
//             Immagine={location[0].immagine}
//             nome={location[0].nome}
//             id={location[0].id}
//             onEventSaved={handleEventSaved}
//           />
//         </div>
//       </div>
//       <MapComponent
//         key={`${location[0].latitudine}-${location[0].longitudine}`}
//         isEventSaved={isEventSaved}
//         locations={location}
//         initialLatitude={location[0].latitudine}
//         initialLongitude={location[0].longitudine} />
//       <div className="coloretext eventidet">
//         <h2 className="py-5">Eventi Programmati:
//         </h2>
//         {role == 1 && <button className="btn my-2" onClick={handleShow}>Aggiungi nuovo evento</button>}
//         <div >
//           <div className="row ">
//             <CreateEvent show={show} close={handleClose} onEventSaved={handleEventSaved} idlocation={id} ></CreateEvent>

//             {events ? (
//               <Carousel showIndicators={false} interval={null} controls={events.length > 1}
//               touch={events.length > 1}>
//                 {[...Array(Math.ceil(events.length / 4))].map((_, index) => (
//                   <Carousel.Item key={index}>
//                     <div className="row">
//                       {events.slice(index, index + (window.innerWidth >= 768 ? 4 : 1)).map((eventItem, innerIndex) => (
//                         <div key={innerIndex} className="col-lg-3 col">
//                           <Card className='eventicard coloretext bgcustom p-1'>
//                             <Card.Img src={eventItem.immagine} alt="Event"></Card.Img>
//                             <Card.Body>
//                               <Card.Title>{eventItem.nome}</Card.Title>
//                               <Card.Text>
//                                 <div className="d-flex justify-content-between">
//                                   <p>Data:</p>
//                                   <p>{new Date(eventItem.data.split('T')[0]).toLocaleDateString('it-IT')}</p>
//                                 </div>
//                                 <div className="d-flex justify-content-between">
//                                   <p>Ora:</p>
//                                   <p>{eventItem.data.split('T')[1]}</p>
//                                 </div>
//                                 {role === 1 && (
//                                   <>
//                                     <div className="d-flex justify-content-between">
//                                       <p>Biglietti disponibili:</p>
//                                       <p>{eventItem.bigliettiTotali}</p>
//                                     </div>
//                                     <div className="d-flex justify-content-between">
//                                       <p>Biglietti venduti:</p>
//                                       <p>{eventItem.bigliettiVenduti}</p>
//                                     </div>
//                                   </>
//                                 )}
//                                 <div className="d-flex justify-content-between">
//                                   <p>Prezzo:</p>
//                                   <p>{eventItem.prezzo} €</p>
//                                 </div>
//                               </Card.Text>
//                             </Card.Body>
//                             {role === 1 ? (
//                               <div className="pb-2 d-flex justify-content-around">
//                                 <button className="btn p-2" onClick={() => handleShowUpdate(eventItem)}>Modifica Evento</button>
//                                 <button className="btn" onClick={() => handleShowDelete(eventItem)}>Elimina Evento</button>
//                               </div>
//                             ) : (
//                               <>
//                                 {new Date(eventItem.data.split('T')[0]) < new Date() ? (
//                                   <p className="text-danger">Evento non più disponibile</p>
//                                 ) : (
//                                   eventItem.bigliettiTotali - eventItem.bigliettiVenduti <= 0 ? (
//                                     <p className="fw-bold text-center">Biglietti esauriti</p>
//                                   ) : (
//                                     <div className="align-self-center">
//                                       <input className="inputtext rounded" type="number" min="1" value={quantities[eventItem.id] || 1} onChange={(e) => handleQuantityChange(e, eventItem.id)} />
//                                       <FaCartPlus style={{ fontSize: "2em" }} onClick={() => addToCart(eventItem.id)} type="submit" />
//                                     </div>
//                                   )
//                                 )}
//                               </>
//                             )}
//                           </Card>
//                         </div>
//                       ))}
//                     </div>
//                   </Carousel.Item>
//                 ))}
//               </Carousel>
//             ) : (null)}
//           </div>
//           <DeleteEvent show={showdelete} close={handleCloseDelete} onEventSaved={handleEventSaved} event={selectedEvent} />
//           <UpdateEvent show={showupdate} close={handleCloseUpdate} onEventSaved={handleEventSaved} event={selectedEvent} />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default LocationDetails;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Location } from "./LocationsFunctions";
import MapComponent from "../Layout/Map/MapComponent";
import { FaTrash } from "react-icons/fa6";
import CreateEvent from "../Events/CreateEvent";
import UpdateEvent from "../Events/UpdateEvent";
import DeleteEvent from "../Events/DeleteEvent";
import { EventsListByLocation } from "../Events/EventsFunctions";
import ModifyLocation from "./ModifyLocation";
import { RiPencilFill } from "react-icons/ri";
import { RemoveLocation } from "./LocationsFunctions";
import Card from 'react-bootstrap/Card';
import { Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FaCartPlus } from "react-icons/fa";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./LocationDetails.css";

const LocationDetails = () => {
  const [quantities, setQuantities] = useState({});
  const { id } = useParams();
  const role = parseInt(useSelector(state => state.role));
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [showupdate, setShowupdate] = useState(false);
  const [Showmodiy, setShowmodify] = useState(false);
  const handleShowModify = () => setShowmodify(true);
  const [isEventSaved, setIsEventSaved] = useState(false);
  const [isEventDeleted, setIsEventDeleted] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showdelete, setShowdelete] = useState(false);

  const handleQuantityChange = (event, eventId) => {
    const newQuantities = { ...quantities, [eventId]: event.target.value };
    setQuantities(newQuantities);
  };

  const addToCart = (eventId) => {
    let quantity = 0;
    if (quantities[eventId] === undefined) {
      quantity = 1;
    } else {
      quantity = quantities[eventId];
    }
    if (quantity && quantity > 0) {
      const cart = localStorage.getItem("Cart");
      const cartArray = cart ? JSON.parse(cart) : [];
      for (let i = 0; i < quantity; i++) {
        cartArray.push(eventId);
      }
      localStorage.setItem("Cart", JSON.stringify(cartArray));
    }
    setQuantities({});
  };

  const handleShowUpdate = (event) => {
    setSelectedEvent(event);
    setShowupdate(true);
  };

  const handleShowDelete = (event) => {
    setSelectedEvent(event);
    setShowdelete(true);
  };

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

  const handleRemove = () => {
    RemoveLocation(id)
        .then(() => { 
            localStorage.setItem("toastDelete", "true");
            navigate('/MyLocations');
            setIsEventSaved(true);
        })
        .catch(error => {
            toast.error("Si è verificato un errore durante la rimozione della location!");
        });
  }

  if (location === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bgbottoni">
      <div className="locationdetails">
        <div className='row'>
          <img className="col-lg col immagini " src={location[0].immagine} alt="Location"></img>
          <div className="col-lg col coloretext p-4 d-flex flex-column justify-content-between align-items-center">
            <div>
              <p style={{ fontSize: "2em", fontWeight: "bold" }}>{location[0].nome}</p>
              <p> {location[0].indirizzo}</p>
            </div>
            <div className="d-flex align-self-end">
              {role === 1 && (
                <>
                  <RiPencilFill onClick={handleShowModify} className="mx-2 bottoni" />
                  <FaTrash onClick={handleRemove} className="bottoni" />
                </>
              )}
            </div>
          </div>
          <ModifyLocation
            show={Showmodiy}
            close={() => setShowmodify(false)}
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
        initialLongitude={location[0].longitudine}
      />
      <div className="coloretext eventidet">
        <h2 className="py-5">Eventi Programmati:</h2>
        {role === 1 && (
          <button className="btn my-2" onClick={() => setShow(true)}>Aggiungi nuovo evento</button>
        )}
        <div>
          <div className="row">
            <CreateEvent
              show={show}
              close={handleClose}
              onEventSaved={handleEventSaved}
              idlocation={id}
            />
            {events ? (
              <Carousel
                showIndicators={false}
                interval={null}
                controls={events.length > 1}
                touch={events.length > 1}
              >
                {window.innerWidth >= 768 ? (
                  // Versione desktop: suddivisione in "chunk"
                  [...Array(Math.ceil(events.length / 4))].map((_, index) => (
                    <Carousel.Item key={index}>
    <div className="row">
      {events.slice(index * 4, (index + 1) * 4).map((eventItem, innerIndex) => (
        <div key={innerIndex} className="col-lg-3 col">
          <Card className='eventicard coloretext bgcustom p-1'>
            <Card.Img src={eventItem.immagine} alt="Event"></Card.Img>
            <Card.Body>
              <Card.Title>{eventItem.nome}</Card.Title>
              <Card.Text>
                <div className="d-flex justify-content-between">
                  <p>Data:</p>
                  <p>{new Date(eventItem.data.split('T')[0]).toLocaleDateString('it-IT')}</p>
                </div>
                <div className="d-flex justify-content-between">
                  <p>Ora:</p>
                  <p>{eventItem.data.split('T')[1]}</p>
                </div>
                {role === 1 && (
                  <>
                    <div className="d-flex justify-content-between">
                      <p>Biglietti disponibili:</p>
                      <p>{eventItem.bigliettiTotali}</p>
                    </div>
                    <div className="d-flex justify-content-between">
                      <p>Biglietti venduti:</p>
                      <p>{eventItem.bigliettiVenduti}</p>
                    </div>
                  </>
                )}
                <div className="d-flex justify-content-between">
                  <p>Prezzo:</p>
                  <p>{eventItem.prezzo} €</p>
                </div>
              </Card.Text>
            </Card.Body>
            {role === 1 ? (
              <div className="pb-2 d-flex justify-content-around">
                <button className="btn p-2" onClick={() => handleShowUpdate(eventItem)}>Modifica Evento</button>
                <button className="btn" onClick={() => handleShowDelete(eventItem)}>Elimina Evento</button>
              </div>
            ) : (
              <>
                {new Date(eventItem.data.split('T')[0]) < new Date() ? (
                  <p className="text-danger">Evento non più disponibile</p>
                ) : (
                  eventItem.bigliettiTotali - eventItem.bigliettiVenduti <= 0 ? (
                    <p className="fw-bold text-center">Biglietti esauriti</p>
                  ) : (
                    <div className="align-self-center">
                      <input className="inputtext rounded" type="number" min="1" value={quantities[eventItem.id] || 1} onChange={(e) => handleQuantityChange(e, eventItem.id)} />
                      <FaCartPlus style={{ fontSize: "2em" }} onClick={() => addToCart(eventItem.id)} type="submit" />
                    </div>
                  )
                )}
              </>
            )}
          </Card>
        </div>
      ))}
      {/* Aggiungi eventi dall'inizio se l'ultimo "chunk" contiene meno di 4 eventi */}
      {events.length % 4 !== 0 && index === Math.floor(events.length / 4) && (
        events.slice(0, 4 - (events.length % 4)).map((eventItem, innerIndex) => (
          <div key={innerIndex} className="col-lg-3 col">
            <Card className='eventicard coloretext bgcustom p-1'>
              <Card.Img src={eventItem.immagine} alt="Event"></Card.Img>
              <Card.Body>
                <Card.Title>{eventItem.nome}</Card.Title>
                <Card.Text>
                  <div className="d-flex justify-content-between">
                    <p>Data:</p>
                    <p>{new Date(eventItem.data.split('T')[0]).toLocaleDateString('it-IT')}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p>Ora:</p>
                    <p>{eventItem.data.split('T')[1]}</p>
                  </div>
                  {role === 1 && (
                    <>
                      <div className="d-flex justify-content-between">
                        <p>Biglietti disponibili:</p>
                        <p>{eventItem.bigliettiTotali}</p>
                      </div>
                      <div className="d-flex justify-content-between">
                        <p>Biglietti venduti:</p>
                        <p>{eventItem.bigliettiVenduti}</p>
                      </div>
                    </>
                  )}
                  <div className="d-flex justify-content-between">
                    <p>Prezzo:</p>
                    <p>{eventItem.prezzo} €</p>
                  </div>
                </Card.Text>
              </Card.Body>
              {role === 1 ? (
                <div className="pb-2 d-flex justify-content-around">
                  <button className="btn p-2" onClick={() => handleShowUpdate(eventItem)}>Modifica Evento</button>
                  <button className="btn" onClick={() => handleShowDelete(eventItem)}>Elimina Evento</button>
                </div>
              ) : (
                <>
                  {new Date(eventItem.data.split('T')[0]) < new Date() ? (
                    <p className="text-danger">Evento non più disponibile</p>
                  ) : (
                    eventItem.bigliettiTotali - eventItem.bigliettiVenduti <= 0 ? (
                      <p className="fw-bold text-center">Biglietti esauriti</p>
                    ) : (
                      <div className="align-self-center">
                        <input className="inputtext rounded" type="number" min="1" value={quantities[eventItem.id] || 1} onChange={(e) => handleQuantityChange(e, eventItem.id)} />
                        <FaCartPlus style={{ fontSize: "2em" }} onClick={() => addToCart(eventItem.id)} type="submit" />
                      </div>
                    )
                  )}
                </>
              )}
            </Card>
          </div>
        ))
      )}
    </div>
  </Carousel.Item>
                  ))
                ) : (
                  // Versione mobile: nessuna suddivisione in "chunk"
                  events.map((eventItem, index) => (
                    <Carousel.Item key={index}>
                      <div className="row">
                        <div className="col-lg-3 col">
                          <Card className='eventicard coloretext bgcustom p-1'>
                            <Card.Img src={eventItem.immagine} alt="Event"></Card.Img>
                            <Card.Body>
                              <Card.Title>{eventItem.nome}</Card.Title>
                              <Card.Text>
                                <div className="d-flex justify-content-between">
                                  <p>Data:</p>
                                  <p>{new Date(eventItem.data.split('T')[0]).toLocaleDateString('it-IT')}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <p>Ora:</p>
                                  <p>{eventItem.data.split('T')[1]}</p>
                                </div>
                                {role === 1 && (
                                  <>
                                    <div className="d-flex justify-content-between">
                                      <p>Biglietti disponibili:</p>
                                      <p>{eventItem.bigliettiTotali}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                      <p>Biglietti venduti:</p>
                                      <p>{eventItem.bigliettiVenduti}</p>
                                    </div>
                                  </>
                                )}
                                <div className="d-flex justify-content-between">
                                  <p>Prezzo:</p>
                                  <p>{eventItem.prezzo} €</p>
                                </div>
                              </Card.Text>
                            </Card.Body>
                            {role === 1 ? (
                              <div className="pb-2 d-flex justify-content-around">
                                <button className="btn p-2" onClick={() => handleShowUpdate(eventItem)}>Modifica Evento</button>
                                <button className="btn" onClick={() => handleShowDelete(eventItem)}>Elimina Evento</button>
                              </div>
                            ) : (
                              <>
                                {new Date(eventItem.data.split('T')[0]) < new Date() ? (
                                  <p className="text-danger">Evento non più disponibile</p>
                                ) : (
                                  eventItem.bigliettiTotali - eventItem.bigliettiVenduti <= 0 ? (
                                    <p className="fw-bold text-center">Biglietti esauriti</p>
                                  ) : (
                                    <div className="align-self-center">
                                      <input className="inputtext rounded" type="number" min="1" value={quantities[eventItem.id] || 1} onChange={(e) => handleQuantityChange(e, eventItem.id)} />
                                      <FaCartPlus style={{ fontSize: "2em" }} onClick={() => addToCart(eventItem.id)} type="submit" />
                                    </div>
                                  )
                                )}
                              </>
                            )}
                          </Card>
                        </div>
                      </div>
                    </Carousel.Item>
                  ))
                )}
              </Carousel>
            ) : (null)}
          </div>
          <DeleteEvent show={showdelete} close={handleCloseDelete} onEventSaved={handleEventSaved} event={selectedEvent} />
          <UpdateEvent show={showupdate} close={handleCloseUpdate} onEventSaved={handleEventSaved} event={selectedEvent} />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LocationDetails;
