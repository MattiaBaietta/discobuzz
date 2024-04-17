import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ModifyEvent } from './EventsFunctions';
import { useEffect } from 'react';

function UpdateEvent(props) {

  const [formData, setFormData] = useState(null); // Inizializza formData a null
  // Imposta i dati del form solo se props.event è valido
  useEffect(() => {
    if (props.event) {
      setFormData({
        Id: props.event.id,
        IdLocation: props.event.idlocation,
        Nome: props.event.nome,
        Descrizione: props.event.descrizione,
        Data: props.event.data,
        Prezzo: props.event.prezzo,
        BigliettiTotali: props.event.bigliettiTotali,
        Immagine: props.event.immagine
      });
    }
  }, [props.event]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)

  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    ModifyEvent(formData);
    props.onEventSaved();
    setFormData({
      IdLocation: props.event.idlocation,
      Nome: '',
      Descrizione: '',
      Data: '',
      Prezzo: 0,
      BigliettiTotali: 0,
      Immagine: '',
    });
    props.close();
  }

  return (

      <Modal className='bgsfondo bgbottoni' show={props.show} onHide={props.close}>
        <Modal.Header className='bgmodal coloretext' closeButton>
          <Modal.Title className='fs-3'>Aggiungi nuovo evento</Modal.Title>
        </Modal.Header>
        <Modal.Body className='bgmodal  '>
          {formData && (
            <>
              <div className='coloretext d-flex  fs-5 text-center py-2  justify-content-between'>
                <label className='w-50 fw-bold'>Nome Evento:</label>
                <input type="text" className='inputtext rounded-3 w-50' name="Nome" value={formData.Nome} required onChange={handleChange} />
              </div>
              <div className='coloretext d-flex  fs-5 text-center py-2  justify-content-between'>
                <label className='w-50 fw-bold'>Immagine Evento:</label>
                <input type="text" className='inputtext rounded-3 w-50' name="Immagine" value={formData.Immagine} required onChange={handleChange} />
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
            </>
          )}
        </Modal.Body>
        <Modal.Footer className='bgmodal'>
          <button className='btn' onClick={props.close}>
            Chiudi
          </button>
          <button className='btn' onClick={handleSubmit}>Modifica Evento</button>
        </Modal.Footer>

      </Modal>
      );
}

      export default UpdateEvent;