import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RegisterEvent } from './EventsFunctions';

function CreateEvent(props) {
  const [formData, setFormData] = useState({
    IdLocation: props.idlocation,
    Nome: '',
    Descrizione: '',
    Data: '',
    Prezzo: 0,
    BigliettiTotali: 0,
    isActive: true
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await RegisterEvent(formData);
      setFormData({
        IdLocation: props.idlocation,
        Nome: '',
        Descrizione: '',
        Data: '',
        Prezzo: 0,
        BigliettiTotali: 0,
      });
      props.onEventSaved();
      props.close();
    } catch (error) {
      console.error('Errore durante la registrazione dell\'evento:', error);

    }
  };

  return (
    <>
      <Modal show={props.show} onHide={props.close}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi nuovo evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <label>Nome Evento:</label>
            <input type="text" name="Nome" value={formData.Nome} onChange={handleChange} required />
            <label>Descrizione:</label>
            <input type="text" name="Descrizione" value={formData.Descrizione} onChange={handleChange} required />
            <label>Data:</label>
            <input type="datetime-local" name="Data" value={formData.Data} onChange={handleChange} required />
            <label>Prezzo</label>
            <input type="number" name="Prezzo" value={formData.Prezzo} onChange={handleChange} required />
            <label>Numero Biglietti:</label>
            <input type="number" name="BigliettiTotali" value={formData.BigliettiTotali} onChange={handleChange} required />
            <Button variant="primary" type="submit">Salva Evento</Button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.close}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateEvent;
