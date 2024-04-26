import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import MapComponent from "../Layout/Map/MapComponent";
import { EventListByRange } from "./EventsFunctions";
import { set } from "ol/transform";
import { FaCartPlus } from "react-icons/fa";
import "./EventsUser.css"
import { Card, Carousel } from "react-bootstrap";
import { toast } from "react-toastify";

const EventUser = () => {
  const [value, setValue] = useState(20);
  const location = useSelector((state) => state.coordinate);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Search, setSearch] = useState(false);
  const [idLocationNavigationArray, setIdLocationNavigationArray] = useState([]);
  const [quantities, setQuantities] = useState({});


  const geo = useSelector((state) => state.geo);
  let locationtosend = {
    x: geo.x,
    y: geo.y,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(!Search);
  };


  useEffect(() => {
    if (location.x != undefined) {
      locationtosend = location;
    }
    const formToSend = {
      x: locationtosend.x,
      y: locationtosend.y,
      range: value,
    };
    EventListByRange(formToSend).then((data) => {
      const futureEvents = data.filter(event => {
        const eventDate = new Date(event.data.split('T')[0]);
        const currentDate = new Date();
        return eventDate >= currentDate;
      });

      setEvents(futureEvents);
      const idLocationNavArray = data.map(
        (event) => event.idLocationNavigation
      );
      setIdLocationNavigationArray(idLocationNavArray);
    });
  }, [Search, geo]);

  const handleQuantityChange = (event, eventId) => {
    const newQuantities = { ...quantities, [eventId]: event.target.value };
    setQuantities(newQuantities);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const addToCart = (eventId) => {
    let quantity = 0;
    if (quantities[eventId] === undefined) {
      quantity = 1;
    }
    else {
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
    toast.success("Evento aggiunto al carrello");
  };

  return (
    <div className="">
      <div className="pdg eventilocation coloretext">
        <h1>Cerca eventi intorno a te</h1>
        <div className="d-flex py-4 bgbottoni justify-content-center">
          <Box sx={{ width: 300 }}>
            <Slider
              value={value}
              onChange={handleChange}
              aria-label="Slider"
              valueLabelDisplay="auto"
              min={20}
              max={100}
              valueLabelFormat={(value) => `${value} km`}
            />
          </Box>
          <button className="mx-4 btn" onClick={handleSubmit}>Cerca</button>
        </div>
      </div>
      <div className="mt-5">
        <MapComponent locations={idLocationNavigationArray} />
      </div>
      <div className="eventilocation">
        <div className="coloretext row">
          <Carousel
            indicators={false}
            prevIcon={<span className="carousel-control-prev-icon" />}
            nextIcon={<span className="carousel-control-next-icon" />}
            interval={null} // Disable auto sliding
            className="d-block d-md-none" // Show only one card on mobile
          >
            {events.map((event, index) => {
              const eventDate = new Date(event.data.split('T')[0]);
              const currentDate = new Date();
              const isEventPassed = eventDate < currentDate;
              if (!isEventPassed) {
                return (
                  <Carousel.Item key={index}>
                    <div className="col-12">
                      <Card className='eventicard coloretext bgcustom p-1'>
                        <Card.Img src={event.immagine} />
                        <Card.Body>
                          <Card.Title>{event.nome}</Card.Title>
                          <Card.Text>
                            <div className="d-flex justify-content-between">
                              <p>Presso:</p>
                              <p>{event.idLocationNavigation.nome}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                              <p>Data:</p>
                              <p>{new Date(event.data.split('T')[0]).toLocaleDateString('it-IT')}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                              <p>Ora:</p>
                              <p>{event.data.split('T')[1]}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                              <p>Prezzo:</p>
                              <p>{event.prezzo} €</p>
                            </div>
                            {console.log(event)}
                          </Card.Text>
                        </Card.Body>
                        {event.bigliettiTotali - event.bigliettiVenduti <= 0 ? (
                          <p className="fw-bold text-center">Biglietti esauriti</p>
                        ) : (
                          <div className="align-self-center">
                            <input className="inputtext rounded" type="number" min="1" value={quantities[event.id] || 1} onChange={(e) => handleQuantityChange(e, event.id)} />
                            <FaCartPlus style={{ fontSize: "2em" }} onClick={() => addToCart(event.id)} type="submit" />
                          </div>)}
                      </Card>
                    </div>
                  </Carousel.Item>
                );
              }
              return null;
            })}
          </Carousel>
          <Carousel
            indicators={false}
            prevIcon={<span className="carousel-control-prev-icon" />}
            nextIcon={<span className="carousel-control-next-icon" />}
            interval={null} // Disable auto sliding
            className="d-none d-md-block" // Show four cards on desktop
          >
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
                    const isEventPassed = eventDate < currentDate;
                    if (!isEventPassed) {
                      return (
                        <div key={index} className="col-3">
                          <Card className='eventicard coloretext bgcustom p-1'>
                            <Card.Img src={event.immagine} />
                            <Card.Body>
                              <Card.Title>{event.nome}</Card.Title>
                              <Card.Text>
                                <div className="d-flex justify-content-between">
                                  <p>Presso:</p>
                                  <p>{event.idLocationNavigation.nome}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <p>Data:</p>
                                  <p>{new Date(event.data.split('T')[0]).toLocaleDateString('it-IT')}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <p>Ora:</p>
                                  <p>{event.data.split('T')[1]}</p>
                                </div>
                                <div className="d-flex justify-content-between">
                                  <p>Prezzo:</p>
                                  <p>{event.prezzo} €</p>
                                </div>
                              </Card.Text>
                            </Card.Body>
                            {event.bigliettiTotali - event.bigliettiVenduti <= 0 ? (
                              <p className="fw-bold text-center">Biglietti esauriti</p>
                            ) : (
                              <div className="align-self-center">
                                <input className="inputtext rounded" type="number" min="1" value={quantities[event.id] || 1} onChange={(e) => handleQuantityChange(e, event.id)} />
                                <FaCartPlus style={{ fontSize: "2em" }} onClick={() => addToCart(event.id)} type="submit" />
                              </div>)}
                          </Card>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );

};

export default EventUser;
