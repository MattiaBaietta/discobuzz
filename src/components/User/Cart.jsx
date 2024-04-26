import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { EventList } from '../Events/EventsFunctions';
import { set } from 'ol/transform';
import { CheckoutDB } from './CartFunctions';
import { useSelector } from "react-redux"
import { toast } from 'react-toastify';


const Cart = () => {
    const iduser = useSelector(state => state.value.userId);
    console.log("iduser=" + iduser)
    const [array, setArray] = useState(JSON.parse(localStorage.getItem("Cart")) || []);

    const [results, setResults] = useState([]);


    useEffect(() => {

        const fetchEventData = async () => {
            let newResults = [];
            let uniqueNumbers = Array.from(new Set(array));
            const fetchPromises = uniqueNumbers.map(async (number) => {
                let count = array.filter(item => item === number).length;
                const eventData = await EventList(number);
                newResults.push({ count, eventData });
            });
            await Promise.all(fetchPromises);
            setResults(newResults);
        };
        fetchEventData();
    }, [array])

    const handleRemove = (id) => {
        console.log(id)
        let newArray = array.filter(item => item !== id);
        localStorage.setItem("Cart", JSON.stringify(newArray));
        setArray(newArray);
        toast.success("Articolo rimosso dal carrello")

    }
    const handleModify = (id) => {
        let removed = false; 
        let newArray = array.filter(item => {
            if (!removed && item === id) {
                removed = true; 
                return false; 
            }
            return true; 
        });
        localStorage.setItem("Cart", JSON.stringify(newArray));
        setArray(newArray);
        toast.success("Biglietto rimosso dal carrello")
    }
    const handleempty = () => {
        localStorage.removeItem("Cart");
        setArray([]);
    }
    const Checkout = async (carrello) => {
        console.log(carrello);
        try {
            await Promise.all(carrello.map(async (result, index) => {
                await CheckoutDB(iduser, result.eventData.evento.id, result.count);
            }));
            localStorage.removeItem("Cart");
            setArray([]);
            toast.success("Acquisto completato con successo!")
        } catch (error) {
            console.error("Errore durante il checkout:", error);
        }
    }


    return (
        <div className='coloretext bgbottoni '>
            <div className='eventilocation'>
                <h1>Carrello</h1>
                </div>
            <div>
                <div className='row eventilocation '>
                    <div className='col-lg-6 '>
                        {results.sort((a, b) => a.eventData.evento.nome.localeCompare(b.eventData.evento.nome)) // Ordina gli elementi in base al nome
                                .map((result, index) => (
                            <div className='bordosotto  py-4 ' key={index}>
                                <div className='row'>
                                    <img className='col-lg-3' src={result.eventData.evento.immagine}></img>
                                    <div className='col-lg-9 px-2'>
                                        <div className='py-2'>
                                            <div className='d-flex justify-content-between '>
                                                <p className='fw-bold'>Nome : {result.eventData.evento.nome}</p>
                                                <p className='fw-bold'>Presso: {result.eventData.nomeLocation}</p>
                                            </div>
                                            <div className='d-flex justify-content-between'>
                                                <p>Data:</p>
                                                <p>{result.eventData.evento.data.split('T')[0]}</p>
                                            </div>
                                            <div className='d-flex justify-content-between'>
                                                <p>Numero Biglietti: {result.count} </p>
                                                <p>Prezzo Totale: {result.count * result.eventData.evento.prezzo}</p>
                                            </div>
                                            <button className='btn mx-3' onClick={() => handleModify(result.eventData.evento.id)}>Rimuovi un biglietto</button>
                                            <button className='btn' onClick={() => handleRemove(result.eventData.evento.id)}>Rimuovi Articolo</button>
                                        </div>
                                </div> 
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='col-lg-6 pb-4 d-flex flex-column justify-content-end'>
                        <h3>Totale da pagare: {results.reduce((acc, result) => acc + result.count * result.eventData.evento.prezzo, 0)}€</h3>
                        <div className='mt-3'>
                            <button className='btn mx-3' onClick={handleempty}>Svuota carrello</button>
                            <button className='btn' onClick={() => Checkout(results)}>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart