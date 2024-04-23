import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RegisterEvent } from './EventsFunctions';
import "../Locations/Createlocation.css"

function CreateEvent(props) {
  const [formData, setFormData] = useState({
    IdLocation: props.idlocation,
    Nome: '',
    Descrizione: '',
    Data: '',
    Prezzo: 0,
    BigliettiTotali: 0,
    isActive: true,
    Immagine: '',
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
        Immagine: '',
      });
      props.onEventSaved();
      props.close();
    } catch (error) {
      console.error('Errore durante la registrazione dell\'evento:', error);

    }
  };

  return (
    <>
      <Modal className='bgsfondo bgbottoni modal-lg' show={props.show} onHide={props.close}>
        <form onSubmit={handleSubmit}>
          <Modal.Header className='bgmodal coloretext' closeButton>
            <Modal.Title className='fs-3'>Aggiungi nuovo evento</Modal.Title>
          </Modal.Header>
          <Modal.Body className='bgmodal  '>
            <div className='coloretext d-flex  fs-5 text-center py-2  justify-content-between'>
              <label className='w-50 fw-bold'>Nome Evento:</label>
              <input type="text" className='inputtext rounded-3 w-50' name="Nome" value={formData.Nome} required onChange={handleChange} />
            </div>
            <div className='coloretext d-flex  fs-5 text-center py-2  justify-content-between'>
              <label className='w-50 fw-bold'>Immagine evento:</label>
              <input type="text" className='inputtext rounded-3 w-50' name="Immagine" value={formData.Url} required onChange={handleChange} />
            </div>
            <div className='coloretext d-flex  fs-5 text-center py-2  justify-content-between'>
              <label className='w-50 fw-bold'>Descrizione:</label>
              <input type="text" className='inputtext rounded-3 w-50' name="Descrizione" value={formData.Descrizione} required onChange={handleChange} />
            </div>
            <div className='coloretext d-flex  fs-5 text-center py-2  justify-content-between'>
              <label className='w-50 fw-bold'>Data:</label>
              <input type="datetime-local" className='inputtext rounded-3 w-50' name="Data" value={formData.Data} required onChange={handleChange} />
            </div>
            <div className='coloretext d-flex  fs-5 text-center py-2  justify-content-between'>
              <label className='w-50 fw-bold'>Prezzo:</label>
              <input type="number" className='inputtext rounded-3 w-50' name="Prezzo" value={formData.Prezzo} required onChange={handleChange} />
            </div>
            <div className='coloretext d-flex  fs-5 text-center py-2  justify-content-between'>
              <label className='w-50 fw-bold'>Numero biglietti:</label>
              <input type="number" className='inputtext rounded-3 w-50' name="BigliettiTotali" value={formData.BigliettiTotali} required onChange={handleChange} />
            </div>
          </Modal.Body>
          <Modal.Footer className='bgmodal'>
            <button className='btn' onClick={props.close}>
              Chiudi
            </button>
            <button className='btn' type="submit">Salva Evento</button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
}

export default CreateEvent;
