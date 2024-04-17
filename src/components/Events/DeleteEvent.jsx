import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RemoveEvent } from './EventsFunctions';
import { useEffect } from 'react';

function DeleteEvent(props) {

    const [idevento, setidevento] = useState(null); // Inizializza formData a null
    
    useEffect(() => {
      
        if (props.event) {  
          console.log(props.event.id);
            setidevento(props.event.id);
        }
    },[props.event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(idevento)
    RemoveEvent(idevento);
    props.onEventSaved();
    props.close();
  }

  return (
    <>
      <Modal show={props.show} onHide={props.close}>
        <Modal.Header closeButton>
          <Modal.Title>Elimina Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                    <label>Sei sicuro di voler eliminare l'evento?</label> 
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.close}>
            No
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
           Si
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteEvent;