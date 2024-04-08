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
          Id:props.event.id,
          IdLocation: props.idlocation,
          Nome: props.event.nome,
          Descrizione: props.event.descrizione,
          Data: props.event.data,
          Prezzo: props.event.prezzo,
          BigliettiTotali: props.event.bigliettiTotali
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
      IdLocation: props.idlocation,
      Nome: '',
      Descrizione: '',
      Data: '',
      Prezzo: 0,
      BigliettiTotali: 0
    });
    props.close();
  }

  return (
    <>
      <Modal show={props.show} onHide={props.close}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {formData &&(
                <>
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
                </>
            )}
            



        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.close}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Modifica Evento
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateEvent;