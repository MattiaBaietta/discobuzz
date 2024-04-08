import React, { useEffect, useState } from 'react';
import MapComponent from '../Layout/Map/MapComponent';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { OrganizerLocations } from './LocationsFunctions';
import L from 'leaflet'; // Importa Leaflet
import Button from 'react-bootstrap/Button';
import { Marker, Popup } from 'react-leaflet';

import { useSelector } from 'react-redux';
import Createlocation from './Createlocation';

// Crea l'icona personalizzata
export const customIcon = new L.Icon({
  iconUrl: 'https://maps.google.com/mapfiles/kml/paddle/red-blank.png',
  iconSize: [32, 32],
});

const Mylocations = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();
  const user = parseInt(useSelector(state => state.value));
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    OrganizerLocations(user).then((data) => {
      setLocations(data);
    });
  }, []);
  const LocationDetails=(id)=>{
    navigate(`/LocationDetails/${id}`);
  }

  return (
    <div>
      <h1>Le mie locations</h1>
      <div>
        <Button onClick={handleShow}>Aggiungi Location</Button> 
        <Createlocation show={show} close={handleClose}></Createlocation>
      </div>
      {locations.map((location, index) => (
        <div key={index}>
          <label>Nome: {location.nome}</label>
          <label>Indirizzo: {location.indirizzo}</label>
          <button className="btn btn-primary" onClick={()=>LocationDetails(location.id)} >Visualizza Dettagli</button>
        </div>
      ))}
      <MapComponent locations={locations}>
        
      </MapComponent>

    </div>
  );
};

export default Mylocations;
