import React, { useEffect, useState } from 'react';
import MapComponent from '../Layout/Map/MapComponent';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { OrganizerLocations } from './LocationsFunctions';
import L from 'leaflet'; // Importa Leaflet
import Button from 'react-bootstrap/Button';
import { Marker, Popup } from 'react-leaflet';
import './Mylocations.css'

import { useSelector } from 'react-redux';
import Createlocation from './Createlocation';
import { CiCirclePlus } from "react-icons/ci";

export const customIcon = new L.Icon({
  iconUrl: 'https://maps.google.com/mapfiles/kml/paddle/red-blank.png',
  iconSize: [32, 32],
});

const Mylocations = () => {
  const [show, setShow] = useState(false);
  const [isLocationSaved, setIsLocationSaved] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();
  const user = useSelector(state => state.value.userId);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    OrganizerLocations(user).then((data) => {
      setLocations(data);
    });
    setIsLocationSaved(false);
  }, [isLocationSaved]);
  
  

  const LocationDetails=(id)=>{
    navigate(`/LocationDetails/${id}`);
  }
  const handleLocationSaved = () => {
    setIsLocationSaved(true);
     
  };
  return (
    <div className='coloretext bgbottoni'>
      <Createlocation handleLocationSaved={handleLocationSaved} show={show} close={handleClose}></Createlocation>
      
      <div className='start d-flex'>
        <div className=''>
          {locations.map((location, index) => (
            <div key={index} className='eventilocation  d-flex'>
              <img  className='w-50 immagini' src={location.immagine}></img>
              <div className='w-50 d-flex flex-column justify-content-between align-items-center p-5'>
                <div>
                  <p style={{fontSize:"2em",fontWeight:"bold"}}>{location.nome}</p>
                  <p>{location.indirizzo}</p>
                </div>
 
                <button className=" w-50 btn " onClick={()=>LocationDetails(location.id)} >Visualizza Dettagli</button>
              </div>
            </div>
          ))}
        </div>
      </div>
          
        <CiCirclePlus className='addbutton' onClick={handleShow}>Aggiungi Location</CiCirclePlus>
        
      
    </div>
  );
};

export default Mylocations;
