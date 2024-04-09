import MapComponent from "../Layout/Map/MapComponent"
import { useEffect, useState } from "react";
import { getSliderUtilityClass } from "@mui/material";
import { SliderMark } from "@mui/material";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import Button from 'react-bootstrap/Button';
import { useSelector } from "react-redux";
import { EventListByRange } from "./EventsFunctions";




const EventUser = () => {
    const [value, setValue] = useState(20);
    const location=useSelector(state=>state.coordinate);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [Search,setSearch]=useState(false);
    const [idLocationNavigationArray, setIdLocationNavigationArray] = useState([]);
 

    const geo=useSelector(state=>state.geo);
    let locationtosend={
        x:geo.x,
        y:geo.y,
    }
    console.log(locationtosend)

    const  handleSubmit = (e) => {
        e.preventDefault();
        setSearch(!Search)
        console.log("search state"+Search)

    }
    useEffect(()=>{
        if(location.x!=undefined){
            locationtosend=location;
        }
        const formToSend = {
            x: locationtosend.x,
            y: locationtosend.y,
            range: value,
        };
        EventListByRange(formToSend).then((data) => {
            setEvents(data);
            console.log(data)
            const idLocationNavArray = data.map(event => event.idLocationNavigation);
            console.log(idLocationNavArray)
            setIdLocationNavigationArray(idLocationNavArray);
          });
       
    },[Search,geo])



    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

 return(

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
        <MapComponent locations={idLocationNavigationArray}/>
        <Button onClick={handleSubmit}>Cerca Eventi intorno a te</Button>
        
        {events && events.map((event, index) => {
                {console.log(events)}
    return (
        <div key={index}>
            <label>Nome:{event.nome}</label>
            <label>Descrizione:{event.descrizione}</label>
            <label>Data:{event.data}</label>
            <label>Prezzo Biglietto:{event.prezzo}</label>
            <Button>Acquista</Button>
        </div>
    );
})}
    </>
 )
}
export default EventUser