import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrganizerLocations } from './LocationsFunctions';
import L from 'leaflet'; // Importa Leaflet
import './Mylocations.css'
import { toast } from 'react-toastify';
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
    console.log("useeffect fatto")
    if(localStorage.getItem('toastDelete')=='true'){
    toast.success('Location eliminata con successo');
    localStorage.setItem('toastDelete',false);
    }
  }, [user,isLocationSaved]);

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
            <div key={index} className='eventilocation  row'>
              <img className="col-lg col immagini " src={location.immagine} alt="Location"></img>
              <div className="col-lg col coloretext p-4 d-flex flex-column justify-content-between align-items-center">
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
