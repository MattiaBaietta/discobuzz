
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import MapComponent from "../Layout/Map/MapComponent";
import { EventListByRange } from "./EventsFunctions";
import { set } from "ol/transform";

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

  const handleChange = (event,newValue) => {
    setValue(newValue);
  };

  const addToCart = (eventId) => {
    let quantity=0;
    if(quantities[eventId] === undefined )
    {
        quantity=1;
    }
    else 
    {
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
    <>
      <Box sx={{ width: 300 }}>
        <h1>Eventi</h1>
        <Slider
          value={value}
          onChange={handleChange}
          aria-label="Slider"
          valueLabelDisplay="auto"
          min={0}
          max={100}
        />
      </Box>
      <MapComponent locations={idLocationNavigationArray} />
      <Button onClick={handleSubmit}>Cerca Eventi intorno a te</Button>

      {events &&
        events.map((event, index) => {
          return (
            <form key={index} onSubmit={(e) => e.preventDefault()}>
              <div>
                <label>Nome:{event.nome}</label>
                <label>Descrizione:{event.descrizione}</label>
                <label>Data:{event.data}</label>
                <label>Prezzo Biglietto:{event.prezzo}</label>
                <label>Quantità:</label>
                <input type="number" min="1" value={quantities[event.id] || 1} onChange={(e) => handleQuantityChange(e, event.id)}  />
                <Button
                  onClick={() => addToCart(event.id)}
                  type="submit"
                >
                  Acquista
                </Button>
              </div>
            </form>
          );
        })}
    </>
  );
};
export default EventUser;
