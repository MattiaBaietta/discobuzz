import MapComponent from "../Layout/Map/MapComponent"
import { Button } from "react-bootstrap"
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import { useSelector } from "react-redux";
import { UpdateLocation } from "./LocationsFunctions";
import "./Createlocation.css"
import { ToastContainer, toast } from "react-toastify";


const ModifyLocation = (props) => {
  const user = useSelector(state => state.value.userId);
  const location = useSelector(state => state.coordinate);
  let locationtosend = {
    x: props.initialLongitude,
    y: props.initialLatitude,
    label: props.indirizzo
  }

  const [nome, setNome] = useState(props.nome);
  const [Url, setUrl] = useState(props.Immagine)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (location.x != undefined) {
      locationtosend = location;
    }
    const formToSend = {
      Nome: nome,
      Longitudine: locationtosend.x,
      Latitudine: locationtosend.y,
      Indirizzo: locationtosend.label,
      IdUtente: user,
      Immagine: Url,
      id: props.id,
    };
    UpdateLocation(formToSend);
    toast.success('Location modificata con successo');
    props.onEventSaved();
    props.close();
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'Nome') {
      setNome(value); // Aggiorna lo stato del nome
    } else if (name === 'Url') {
      setUrl(value); // Aggiorna lo stato dell'URL
    }
  }

  return (

    <>

      <Modal className='bgsfondo bgbottoni  modal-lg ' show={props.show} onHide={props.close}>
      <Modal.Header className='bgmodal coloretext' closeButton>
          <Modal.Title className='fs-3'>Modifica location</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bgmodal  '>
          <div className='coloretext d-flex  fs-5 text-center py-2  justify-content-between'>
            <label className='w-50 fw-bold'>Nome Location:</label>
            <input className='inputtext rounded-3 w-50' type="text" name="Nome" value={nome} onChange={handleChange} />
          </div>
          <div className=' coloretext d-flex fs-5  text-center py-3  justify-content-between'>
            <label className=' w-50 fw-bold'>Url Immagine:</label>
            <input className='inputtext rounded-3 w-50' type="text" name="Url" value={Url} onChange={handleChange} />
          </div>

          <MapComponent  locations={props.location} initialLatitude={props.initialLatitude} initialLongitude={props.initialLongitude} />
        </Modal.Body>
        <Modal.Footer className='bgmodal'>
          <button className="  btn " variant="secondary" onClick={props.close}>
            Chiudi
          </button>
          <button  className="  btn " variant="primary" onClick={handleSubmit}>
            Salva modifiche
          </button>
        </Modal.Footer>
      </Modal>
    </>
           
  )
}


export default ModifyLocation