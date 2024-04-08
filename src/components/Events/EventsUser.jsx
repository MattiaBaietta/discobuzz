import MapComponent from "../Layout/Map/MapComponent"
import { useState } from "react";
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
    const geo=useSelector(state=>state.geo);
    let locationtosend={
        x:geo.x,
        y:geo.y,
    }
    const  handleSubmit = (e) => {
        e.preventDefault();
        if(location.x!=undefined){
            locationtosend=location;
        }
        console.log(location)

        const formToSend = {
            x: locationtosend.x,
            y: locationtosend.y,
            range: value,
        };
        EventListByRange(formToSend);
    }

    console.log(locationtosend)
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
        <MapComponent/>
        <Button onClick={handleSubmit}>Cerca Eventi intorno a te</Button>
    </>
 )
}
export default EventUser