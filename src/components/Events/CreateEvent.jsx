import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RegisterEvent } from './EventsFunctions';

function CreateEvent(props) {

  const [formData, setFormData] = useState({
    IdLocation:props.idlocation,
    Nome: '',
    Descrizione: '',
    Data: '',
    Prezzo: 0,
    BigliettiTotali: 0
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    RegisterEvent(formData);
    
    setFormData({
      IdLocation: props.idlocation,
      Nome: '',
      Descrizione: '',
      Data: '',
      Prezzo: 0,
      BigliettiTotali: 0
    });
    props.onEventSaved();
    
    props.close();
  }

  return (
    <>
      <Modal show={props.show} onHide={props.close}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi nuovo evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <label>Nome Evento:</label>
            <input type="text" name="Nome" id="" value={formData.Nome} onChange={handleChange}/>
            <label>Descrizione:</label>
            <input type="text" name="Descrizione" id="" value={formData.Descrizione} onChange={handleChange}/>
            <label>Data:</label>
            <input type="datetime-local" name="Data" id="" value={formData.Data} onChange={handleChange}/>
            <label>Prezzo</label>
            <input type="number" name="Prezzo" id="" value={formData.Prezzo} onChange={handleChange}/>
            <label>Numero Biglietti:</label>
            <input type="number" name="BigliettiTotali" id="" value={formData.BigliettiTotali} onChange={handleChange}/>



        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.close}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Salva Evento
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateEvent;