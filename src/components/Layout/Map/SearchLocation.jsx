

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
     dispatch(getCoordinates(result.location));

      
  }
  function clearSearchEventHandler() {
    dispatch(getCoordinates(null)); // Reset delle coordinate a null
  }

  const map = useMap(props);
  useEffect(() => {
    map.addControl(searchControl);
    map.on('geosearch/showlocation', searchEventHandler);
    map.on('geosearch/clear', clearSearchEventHandler); // Gestione dell'evento di cancellazione della ricerca

    return () => {
      map.removeControl(searchControl);
      map.off('geosearch/showlocation', searchEventHandler); // Rimozione degli eventi quando il componente viene smontato
      map.off('geosearch/clear', clearSearchEventHandler);
    };
  }, [map, searchControl, dispatch]);

  return null; 
}