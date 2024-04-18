
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
    console.log("search state" + Search);
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
      setEvents(data);
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

  return (
    <div className="coloretext">
      
      <div className=" pdg eventilocation"> 
        <h1>Cerca eventi intorno a te</h1>
        <div className="d-flex py-4 bgbottoni justify-content-center ">
          <Box  sx={{ width: 300 }}>
            
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
          <button className="mx-4 btn " onClick={handleSubmit}>Cerca</button>
        </div>
      </div>
      <div className="d-flex pt-4 eventilocation">
        <div className="w-50 ">
          {events &&
            events.map((event, index) => {
              return (
                <div className="row  eventilocation">
                  <form className="" key={index} onSubmit={(e) => e.preventDefault()}>
                    <div className="d-flex">
                      <img className="w-25" src={event.immagine}></img>
                      <div className="px-3 d-flex flex-column w-75">
                        <div className="d-flex justify-content-between">
                          <p>Nome:</p>
                          <p>{event.nome}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p>Data:</p>
                          <p>{event.data.split('T')[0]}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p>Ora:</p>
                          <p>{event.data.split('T')[1]}</p>
                        </div>
                        <div className="d-flex justify-content-between">
                          <p>Prezzo Biglietto:</p>
                          <p>{event.prezzo}€</p>
                        </div>
                        <div className=" align-self-end">
                          <input className="inputtext rounded " type="number" min="1" value={quantities[event.id] || 1} onChange={(e) => handleQuantityChange(e, event.id)} />

                          <FaCartPlus style={{fontSize:"2em"}} onClick={() => addToCart(event.id)}
                            type="submit"/>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              );
            })}
        </div>

        <div className="w-50">
          <MapComponent locations={idLocationNavigationArray} />
        </div>
      </div>
      



    </div>
  );
};
export default EventUser;
