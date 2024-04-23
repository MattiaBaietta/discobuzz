
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { Location } from "./LocationsFunctions";
// import MapComponent from "../Layout/Map/MapComponent";
// import { Button } from 'react-bootstrap';
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


// const LocationDetails = () => {
//   const [quantities, setQuantities] = useState({});
//   const { id } = useParams();
//   var role = parseInt(useSelector(state => state.role));
//   const navigate = useNavigate();
//   const [show, setShow] = useState(false);
//   const [showupdate, setShowupdate] = useState(false);
//   const [Showmodiy, setShowmodify] = useState(false);
//   const [isEventSaved, setIsEventSaved] = useState(false);
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
//     console.log(isEventSaved)
//   }, [id, isEventSaved]);

//   const handleEventSaved = () => {
//     setIsEventSaved(true);
//   };

//   const handleRemove = async () => {
//     await RemoveLocation(id);
//     navigate('/Mylocations');
//     setIsEventSaved(true);
//   }

//   if (location === null) {
//     return <div>Loading...</div>;
//   }
//   return (

//     <div className=" bgbottoni">
//       <div className="locationdetails" >

//         <div className='d-flex '>
//           <img className="w-50 immagini" src={location[0].immagine}></img>
//           <div className="coloretext p-5 w-50 d-flex flex-column justify-content-between align-items-center">
//             <div>
//               <p style={{ fontSize: "2em", fontWeight: "bold" }}>Nome: {location[0].nome}</p>
//               <p>Indirizzo: {location[0].indirizzo}</p>
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

//             {events && events.length > 4 ? (
//               <Carousel>
//                 {events.reduce((chunks, event, index) => {
//                   const eventDate = new Date(event.data.split('T')[0]);
//                   const currentDate = new Date();
//                   const isEventExpired = eventDate < currentDate;
//                   if (index % 4 === 0) {
//                     chunks.push([]);
//                   }
//                   chunks[chunks.length - 1].push(event);
//                   return chunks;
//                 }, []).map((pageEvents, pageIndex) => (
                  
//                   <Carousel.Item key={pageIndex}>
//                     <div className="row">
//                       {pageEvents.map((event, index) => {
//                         return (
//                           <div key={index} className="col-3">
//                             <Card className='eventicard coloretext bgcustom p-1'>
//                               <Card.Img src={event.immagine} />
//                               <Card.Body>
//                                 <Card.Title>{event.nome}</Card.Title>
//                                 <Card.Text>
//                                   <div className="d-flex justify-content-between">
//                                     <p>Data:</p>
//                                     <p>{new Date(event.data.split('T')[0]).toLocaleDateString('it-IT')}</p>
//                                   </div>
//                                   <div className="d-flex justify-content-between">
//                                     <p>Ora:</p>
//                                     <p>{event.data.split('T')[1]}</p>
//                                   </div>
//                                   {role == 1 ? (
//                                     <>
//                                       <div className="d-flex justify-content-between">
//                                         <p>Biglietti disponibili:</p>
//                                         <p> {event.bigliettiTotali}</p>
//                                       </div>
//                                       <div className="d-flex justify-content-between">
//                                         <p>Biglietti venduti:</p>
//                                         <p> {event.bigliettiVenduti}</p>
//                                       </div>
//                                     </>
//                                   ) : null}
//                                   <div className="d-flex justify-content-between">
//                                     <p>Prezzo:</p>
//                                     <p>{event.prezzo} €</p>
//                                   </div>
//                                 </Card.Text>
//                               </Card.Body>
//                               {role === 1 ? (
//                       <div className="pb-2 d-flex justify-content-around">
//                         <button className="btn p-2" onClick={() => handleShowUpdate(event)}>Modifica Evento</button>
//                         <button className="btn" onClick={() => handleShowDelete(event)}>Elimina Evento</button>
//                       </div>
//                     ) : (
//                       !isEventExpired && event.bigliettiTotali - event.bigliettiVenduti <= 0 ? (
//                         <p className="fw-bold text-center">Biglietti esauriti</p>
//                       ) : (
//                         isEventExpired ? (
//                           <p className="text-danger">Evento non più disponibile</p>
//                         ) : (
//                           <div className="align-self-center">
//                             <input className="inputtext rounded" type="number" min="1" value={quantities[event.id] || 1} onChange={(e) => handleQuantityChange(e, event.id)} />
//                             <FaCartPlus style={{ fontSize: "2em" }} onClick={() => addToCart(event.id)} type="submit" />
//                           </div>
//                         )
//                       )
//                     )}
//                             </Card>
//                           </div>)
//                       }
//                       )}
//                     </div>
//                   </Carousel.Item>
//                 ))}
//               </Carousel>
//             ) : (
//               events.map((event, index) => {
//                 const eventDate = new Date(event.data.split('T')[0]);
//                 const currentDate = new Date();
//                 const isEventExpired = eventDate < currentDate;
//                 return (
//                   <Card key={index} className='eventicard coloretext bgcustom col-3 p-1'>
//                     <Card.Img src={event.immagine} />
//                     <Card.Body>
//                       <Card.Title>{event.nome}</Card.Title>
//                       <Card.Text>
//                         <div className="d-flex justify-content-between">
//                           <p>Data:</p>
//                           <p>{new Date(event.data.split('T')[0]).toLocaleDateString('it-IT')}</p>
//                         </div>
//                         <div className="d-flex justify-content-between">
//                           <p>Ora:</p>
//                           <p> {event.data.split('T')[1]}</p>
//                         </div>
//                         {role == 1 ? (
//                           <>
//                             <div className="d-flex justify-content-between">
//                               <p>Biglietti disponibili:</p>
//                               <p> {event.bigliettiTotali}</p>
//                             </div>
//                             <div className="d-flex justify-content-between">
//                               <p>Biglietti venduti:</p>
//                               <p> {event.bigliettiVenduti}</p>
//                             </div>
//                           </>
//                         ) : null}
//                         <div className="d-flex justify-content-between">
//                           <p>Prezzo:</p>
//                           <p> {event.prezzo} €</p>
//                         </div>
//                       </Card.Text>
//                     </Card.Body>
//                     {console.log(role)}
//                     {role === 1 ? (
//                       <div className="pb-2 d-flex justify-content-around">
//                         <button className="btn p-2" onClick={() => handleShowUpdate(event)}>Modifica Evento</button>
//                         <button className="btn" onClick={() => handleShowDelete(event)}>Elimina Evento</button>
//                       </div>
//                     ) : (
//                       !isEventExpired && event.bigliettiTotali - event.bigliettiVenduti <= 0 ? (
//                         <p className="fw-bold text-center">Biglietti esauriti</p>
//                       ) : (
//                         isEventExpired ? (
//                           <p className="text-danger">Evento non più disponibile</p>
//                         ) : (
//                           <div className="align-self-center">
//                             <input className="inputtext rounded" type="number" min="1" value={quantities[event.id] || 1} onChange={(e) => handleQuantityChange(e, event.id)} />
//                             <FaCartPlus style={{ fontSize: "2em" }} onClick={() => addToCart(event.id)} type="submit" />
//                           </div>
//                         )
//                       )
//                     )}
//                   </Card>
//                 )
//               }))}
//           </div>
//           <DeleteEvent show={showdelete} close={handleCloseDelete} onEventSaved={handleEventSaved} event={selectedEvent} />
//           <UpdateEvent show={showupdate} close={handleCloseUpdate} onEventSaved={handleEventSaved} event={selectedEvent} />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default LocationDetails;
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
import { Carousel } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FaCartPlus } from "react-icons/fa";


const LocationDetails = () => {
  const [quantities, setQuantities] = useState({});
  const { id } = useParams();
  var role = parseInt(useSelector(state => state.role));
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


  const handleQuantityChange = (event, eventId) => {
    const newQuantities = { ...quantities, [eventId]: event.target.value };
    setQuantities(newQuantities);
  };

  const addToCart = (eventId) => {
    let quantity = 0;
    if (quantities[eventId] === undefined) {
      quantity = 1;
    }
    else {
      quantity = quantities[eventId];
    }
    console.log(quantity)
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
    console.log(isEventSaved)
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
              {role == 1 &&
                <>
                  <RiPencilFill onClick={handleShowModify} className="mx-2 bottoni" />
                  <FaTrash onClick={handleRemove} className="bottoni " />
                </>
              }
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
        {role == 1 && <button className="btn my-2" onClick={handleShow}>Aggiungi nuovo evento</button>}
        <div >
          <div className="row ">
            <CreateEvent show={show} close={handleClose} onEventSaved={handleEventSaved} idlocation={id} ></CreateEvent>

            {events && events.length > 4 ? (
              <Carousel showIndicators={false}>
                {events.reduce((chunks, event, index) => {
                  if (index % 4 === 0) {
                    chunks.push([]);
                  }
                  chunks[chunks.length - 1].push(event);
                  return chunks;
                }, []).map((pageEvents, pageIndex) => (
                  <Carousel.Item key={pageIndex}>
                    <div className="row">
                      {pageEvents.map((event, index) => {
                        const eventDate = new Date(event.data.split('T')[0]);
                        const currentDate = new Date();
                        const isEventExpired = eventDate < currentDate;
                        {console.log(isEventExpired)}
                        return (
                          <div key={index} className="col-3">
                            <Card className='eventicard coloretext bgcustom p-1'>
                              <Card.Img src={event.immagine} />
                              <Card.Body>
                                <Card.Title>{event.nome}</Card.Title>
                                <Card.Text>
                                  <div className="d-flex justify-content-between">
                                    <p>Data:</p>
                                    <p>{new Date(event.data.split('T')[0]).toLocaleDateString('it-IT')}</p>
                                  </div>
                                  <div className="d-flex justify-content-between">
                                    <p>Ora:</p>
                                    <p>{event.data.split('T')[1]}</p>
                                  </div>
                                  {role == 1 ? (
                                    <>
                                      <div className="d-flex justify-content-between">
                                        <p>Biglietti disponibili:</p>
                                        <p> {event.bigliettiTotali}</p>
                                      </div>
                                      <div className="d-flex justify-content-between">
                                        <p>Biglietti venduti:</p>
                                        <p> {event.bigliettiVenduti}</p>
                                      </div>
                                    </>
                                  ) : null}
                                  <div className="d-flex justify-content-between">
                                    <p>Prezzo:</p>
                                    <p>{event.prezzo} €</p>
                                  </div>
                                </Card.Text>
                              </Card.Body>
                              {role === 1 ? (
                                <div className="pb-2 d-flex justify-content-around">
                                  <button className="btn p-2" onClick={() => handleShowUpdate(event)}>Modifica Evento</button>
                                  <button className="btn" onClick={() => handleShowDelete(event)}>Elimina Evento</button>
                                </div>
                              ) : (
                                isEventExpired ? (
                                  <p className="text-danger">Evento non più disponibile</p>
                                ) : (
                                  !isEventExpired && event.bigliettiTotali - event.bigliettiVenduti <= 0 ? (
                                    <p className="fw-bold text-center">Biglietti esauriti</p>
                                  ) : (
                                    <div className="align-self-center">
                                      <input className="inputtext rounded" type="number" min="1" value={quantities[event.id] || 1} onChange={(e) => handleQuantityChange(e, event.id)} />
                                      <FaCartPlus style={{ fontSize: "2em" }} onClick={() => addToCart(event.id)} type="submit" />
                                    </div>
                                  )
                                )
                              )}
                            </Card>
                          </div>
                        );
                      })}
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              events.map((event, index) => {
                const eventDate = new Date(event.data.split('T')[0]);
                const currentDate = new Date();
                const isEventExpired = eventDate < currentDate;
                return (
                  <Card key={index} className='eventicard coloretext bgcustom col-3 p-1'>
                    <Card.Img src={event.immagine} />
                    <Card.Body>
                      <Card.Title>{event.nome}</Card.Title>
                      <Card.Text>
                        <div className="d-flex justify-content-between">
                          <p>Data:</p>
                          <p>{new Date(event.data.split('T')[0]).toLocaleDateString('it-IT')}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p>Ora:</p>
                          <p> {event.data.split('T')[1]}</p>
                        </div>
                        {role == 1 ? (
                          <>
                            <div className="d-flex justify-content-between">
                              <p>Biglietti disponibili:</p>
                              <p> {event.bigliettiTotali}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                              <p>Biglietti venduti:</p>
                              <p> {event.bigliettiVenduti}</p>
                            </div>
                          </>
                        ) : null}
                        <div className="d-flex justify-content-between">
                          <p>Prezzo:</p>
                          <p> {event.prezzo} €</p>
                        </div>
                      </Card.Text>
                    </Card.Body>
                    {console.log(role)}
                    {role === 1 ? (
                      <div className="pb-2 d-flex justify-content-around">
                        <button className="btn p-2" onClick={() => handleShowUpdate(event)}>Modifica Evento</button>
                        <button className="btn" onClick={() => handleShowDelete(event)}>Elimina Evento</button>
                      </div>
                    ) : (
                      !isEventExpired && event.bigliettiTotali - event.bigliettiVenduti <= 0 ? (
                        <p className="fw-bold text-center">Biglietti esauriti</p>
                      ) : (
                        isEventExpired ? (
                          <p className="text-danger">Evento non più disponibile</p>
                        ) : (
                          <div className="align-self-center">
                            <input className="inputtext rounded" type="number" min="1" value={quantities[event.id] || 1} onChange={(e) => handleQuantityChange(e, event.id)} />
                            <FaCartPlus style={{ fontSize: "2em" }} onClick={() => addToCart(event.id)} type="submit" />
                          </div>
                        )
                      )
                    )}
                  </Card>
                )
              }))}
          </div>
          <DeleteEvent show={showdelete} close={handleCloseDelete} onEventSaved={handleEventSaved} event={selectedEvent} />
          <UpdateEvent show={showupdate} close={handleCloseUpdate} onEventSaved={handleEventSaved} event={selectedEvent} />
        </div>
      </div>
    </div>
  )
}

export default LocationDetails;
