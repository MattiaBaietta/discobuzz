import MapComponent from "../Layout/Map/MapComponent"
import { Button } from "react-bootstrap"
import Modal from 'react-bootstrap/Modal';
import { useSelector } from "react-redux";
import { useState } from "react";
import { RegisterLocation } from "./LocationsFunctions";
import { getUser } from "../../redux/store";



const Createlocation = (props) => {
    const user=parseInt(useSelector(state=>state.value));
    const location=useSelector(state=>state.coordinate);

    const [Nome, setNome] = useState('');

    
    
        
    
    const  handleSubmit = (e) => {
        e.preventDefault();
        
            console.log(location);
        if (location && location.label) {
            

            const formToSend = {
                Nome: Nome,
                Latitudine: location.y,
                Longitudine: location.x,
                Indirizzo:location.label,
                IdUtente: user,
            };
            console.log(formToSend.Longitudine,formToSend.Latitudine,formToSend.Indirizzo,formToSend.Nome,formToSend.IdUtente)
            RegisterLocation(formToSend);
        } else {
            console.error('La posizione non è stata definita correttamente.');
            // Puoi gestire questo caso in modo appropriato, ad esempio mostrando un messaggio di errore all'utente
        }
        props.handleLocationSaved()
        setNome('');
        props.close();
    }   

    const handleChange = (e) => {
        setNome(e.target.value);
    }
    return (
        <>
        <Modal  show={props.show} onHide={props.close}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi nuova location</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                    <label>Nome:</label>
                    <input type="text" name="Nome"  value={Nome} onChange={handleChange}/>   
                <MapComponent />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.close}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Salva Location
          </Button>
        </Modal.Footer>
        </Modal>           
        </>
    )}

    export default Createlocation