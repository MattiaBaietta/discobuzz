import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { RegisterLocation } from './LocationsFunctions';
import MapComponent from '../Layout/Map/MapComponent';

const Createlocation = (props) => {
    const user = useSelector(state => state.value);
    const location = useSelector(state => state.coordinate);
    const [Nome, setNome] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (location && location.label) {
            const formToSend = {
                Nome: Nome,
                Latitudine: location.y,
                Longitudine: location.x,
                Indirizzo: location.label,
                IdUtente: user,
            };
            RegisterLocation(formToSend).then(() => {
                props.handleLocationSaved();
                setNome('');
                props.close();
            }).catch(error => {
                console.error('Errore durante la registrazione della location:', error);
                // Gestisci gli errori qui, se necessario
            });
        } else {
            console.error('La posizione non è stata definita correttamente.');
        }
    };

    const handleChange = (e) => {
        setNome(e.target.value);
    };

    return (
        <Modal show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>Aggiungi nuova location</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label>Nome:</label>
                <input type="text" name="Nome" value={Nome} onChange={handleChange} />
                <MapComponent />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.close}>Chiudi</Button>
                <Button variant="primary" onClick={handleSubmit}>Salva Location</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default Createlocation;
