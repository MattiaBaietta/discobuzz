import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { EventList } from '../Events/EventsFunctions';
import { set } from 'ol/transform';
import { CheckoutDB } from './CartFunctions';
import { useSelector } from "react-redux"
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

    }
    const handleModify = (id) => {
        let removed = false; // Flag per tracciare se abbiamo già rimosso un elemento
        let newArray = array.filter(item => {
            if (!removed && item === id) {
                removed = true; // Imposta il flag su true per indicare che abbiamo già rimosso un elemento
                return false; // Non includere questo elemento nell'array risultante
            }
            return true; // Mantieni gli altri elementi nell'array risultante
        });
        localStorage.setItem("Cart", JSON.stringify(newArray));
        setArray(newArray);
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
                <div className='d-flex eventilocation '>
                    <div className='w-50 '>
                        {results.map((result, index) => (

                            <div className='bordosotto  py-4 ' key={index}>

                                <div className='d-flex'>
                                    <img className='w-25' src={result.eventData.evento.immagine}></img>
    
                                    <div className='w-75 px-2'>
                                        <div>
                                            <div className='d-flex justify-content-between '>
                                                <p>Nome Evento: {result.eventData.evento.nome}</p>
                                                <p>Presso: {result.eventData.nomeLocation}</p>
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
                    <div className='w-50 pb-4 d-flex flex-column justify-content-end'>
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