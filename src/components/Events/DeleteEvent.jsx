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
      <Modal className='bgsfondo bgbottoni' show={props.show} onHide={props.close}>
        <Modal.Header className='bgmodal coloretext' closeButton>
          <Modal.Title>Elimina Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bgmodal coloretext'>
                    <p className='  fs-4'>Sei sicuro di voler eliminare l'evento?</p> 
        </Modal.Body>
        <Modal.Footer className='bgmodal'>
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