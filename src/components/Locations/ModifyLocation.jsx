import MapComponent from "../Layout/Map/MapComponent"
import { Button } from "react-bootstrap"
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import { useSelector } from "react-redux";
import { UpdateLocation } from "./LocationsFunctions";


const ModifyLocation = (props) => {
    const user=parseInt(useSelector(state=>state.value));
    const location=useSelector(state=>state.coordinate);

    let locationtosend={
        x:props.initialLongitude,
        y:props.initialLatitude,
        label:props.indirizzo
    }

    const [nome, setNome] = useState(props.nome);
    const  handleSubmit = (e) => {
        e.preventDefault();
        if(location.x!=undefined){
            locationtosend=location;
        }
        console.log(location)
        const formToSend = {
            Nome: nome,
            Longitudine: locationtosend.x,
            Latitudine: locationtosend.y,
            Indirizzo:locationtosend.label,
            IdUtente: user,
            id:props.id,
        };
        UpdateLocation(formToSend);
        props.onEventSaved();
        props.close();
    }

    const handleChange = (e) => {
        setNome(e.target.value);
    }

    return(

        <>
        <Modal  show={props.show} onHide={props.close}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                    <label>Nome:</label>
                    <input type="text" name="Nome"  value={nome} onChange={handleChange}/>   
                <MapComponent locations={props.location} initialLatitude={props.initialLatitude} initialLongitude={props.initialLongitude}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.close}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Salva modifiche
          </Button>
        </Modal.Footer>
        </Modal>           
        </>
    )
}


export default ModifyLocation