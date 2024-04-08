

import { useEffect } from "react";
import { GeoSearchControl, } from "leaflet-geosearch";
import { useMap,  } from "react-leaflet";
import { customIcon } from "./MapComponent";
import { useDispatch } from "react-redux";
import { getCoordinates } from "../../../redux/store";



 export const SearchLocation = (props) => {

  const dispatch=useDispatch();
  const { provider } = props;


  const searchControl = new GeoSearchControl({
    provider: provider,
    style: 'bar',
    showMarker: false,
  });
  function searchEventHandler(result) {
    console.log(result.location)
     dispatch(getCoordinates(result.location));
    
  }

  const map = useMap(props);
  useEffect(() => {
   
    map.addControl(searchControl);
    map.on('geosearch/showlocation', searchEventHandler);
    return () => map.removeControl(searchControl);
  });

  return null; 
}