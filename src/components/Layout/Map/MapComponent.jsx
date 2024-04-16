import React, { useEffect, useRef, useState } from 'react';


import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { SearchLocation } from './SearchLocation';
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { useDispatch } from "react-redux";
import { geoLocation } from '../../../redux/store';




export const customIcon = new L.Icon({
  iconUrl: 'https://maps.google.com/mapfiles/kml/paddle/red-blank.png',
  iconSize: [32, 32],
});

function MapComponent({ initialLatitude, initialLongitude, locations,isEventSaved}) {
  const dispatch=useDispatch();
  const mapElement = useRef(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  

  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialLatitude != null && initialLongitude != null) {
      setLatitude(initialLatitude);
      setLongitude(initialLongitude);
    }
    else{
      const getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            position => {
              setLongitude(position.coords.longitude);
              setLatitude(position.coords.latitude);
              dispatch(geoLocation({x:position.coords.longitude,y:position.coords.latitude}));
              setError(null);
            },
            error => {
              setError(error.message);
              setLatitude(44.0678); // Latitudine di Rimini
              setLongitude(12.5695);
            }
          );
        } else {
          setError('Geolocation is not supported by this browser.');
          setLatitude(44.0678); // Latitudine di Rimini
          setLongitude(12.5695);
        }
      };
  
      getLocation();

    }
    
  }, [isEventSaved]);

  useEffect(() => {
    if (latitude !== null && longitude !== null && mapElement.current) {
      mapElement.current.setView([latitude, longitude], 13);
    }
  }, [latitude, longitude,isEventSaved]);

  return (
    latitude !== null && longitude !== null && (
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        style={{  height: '500px'}}
        ref={mapElement}
      >
        <SearchLocation provider={new OpenStreetMapProvider({
          params: {
            email: 'mattia.baietta89@gmail.com',
            'accept-language': 'it',


          },
        })} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations && locations.map((location, index) => {
           
          return (
              
            <Marker key={index} position={[parseFloat(location.latitudine).toFixed(4), parseFloat(location.longitudine).toFixed(4)]} icon={customIcon}>
              <Popup>{location.nome}</Popup>
            </Marker>
          );
        })}


      </MapContainer>
    )
  );
}

export default MapComponent;
