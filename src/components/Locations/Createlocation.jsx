import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { RegisterLocation } from './LocationsFunctions';
import MapComponent from '../Layout/Map/MapComponent';
import "./Createlocation.css"
import { toast} from 'react-toastify';

const Createlocation = (props) => {
    const user = useSelector(state => state.value.userId);
    const location = useSelector(state => state.coordinate);
    const [Nome, setNome] = useState('');
    const [Url,setUrl]=useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (location && location.label) {
            const formToSend = {
                Nome: Nome,
                Latitudine: location.y,
                Longitudine: location.x,
                Indirizzo: location.label,
                Immagine:Url,
                IdUtente: user,
            };
            RegisterLocation(formToSend).then(() => {
                props.handleLocationSaved();
                setNome('');
                setUrl('');
                console.log("successo")
                toast.success('Location aggiunta con successo');
                props.close();
            }).catch(error => {
                console.error('Errore durante la registrazione della location:', error);
                toast.error('Errore durante la registrazione della location');
                // Gestisci gli errori qui, se necessario
            });
        } else {
            console.error('La posizione non è stata definita correttamente.');
            toast.error("L'indirizzo non è stato definito correttamente.");
        }
    };

    const handleChange = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)
        const { name, value } = e.target;
        if (name === 'Nome') {
         setNome(value); // Aggiorna lo stato del nome
        } else if (name === 'Url') {
        setUrl(value); // Aggiorna lo stato dell'URL
        }
    };

    return (
        <>

            <Modal  className='bgsfondo bgbottoni modal-lg' show={props.show} onHide={props.close}>
                <Modal.Header className='bgmodal coloretext' closeButton>
                    <Modal.Title className='fs-3'>Aggiungi nuova location</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bgmodal  '>
                    <div >
                        <div className='coloretext d-flex  fs-5 text-center py-2  justify-content-between'>
                            <label className='w-50 fw-bold'>Nome location:</label>
                            <input type="text" className='inputtext rounded-3 w-50' name="Nome" required value={Nome} onChange={handleChange} />
                        </div>
                        <div className=' coloretext d-flex fs-5  text-center py-3  justify-content-between'>
                            <label className=' w-50 fw-bold'>Url Immagine:</label>
                            <input type="text" className='inputtext rounded-3 w-50' name="Url" required value={Url} onChange={handleChange} />
                        </div>
                    </div>
                    <MapComponent />
                    
                </Modal.Body>
                <Modal.Footer className='bgmodal'>
                    <button className="btn" onClick={props.close}>Chiudi</button>
                    <button  className="btn" onClick={handleSubmit}>Salva Location</button>
                </Modal.Footer>
            </Modal>
        </>
       
    );
};

export default Createlocation;
