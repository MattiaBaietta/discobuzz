import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { EventList } from '../Events/EventsFunctions';
import { set } from 'ol/transform';
import { CheckoutDB } from './CartFunctions';
import { useSelector } from "react-redux"
const Cart = () => {
    const iduser=useSelector(state=>state.value);
    console.log("iduser="+iduser)
    const [array, setArray] = useState(JSON.parse(localStorage.getItem("Cart")) || []);
    
    const [results, setResults] = useState([]);


    useEffect(()=>{

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
    },[array])

     const handleRemove = (id) => {
        console.log(id)
        let newArray = array.filter(item => item !== id);
        localStorage.setItem("Cart", JSON.stringify(newArray));
        setArray(newArray);
        
     }
     const handleModify= (id) => {
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
    <div>
      <div>
        <h3>Risultati:</h3>
        {console.log(results)}
          {results.map((result, index) => (
           <div key={index}>
                   Nome Evento: {result.eventData.evento.nome}
                   Presso:{result.eventData.nomeLocation}
                   Descrizione: {result.eventData.evento.descrizione}
                   Numero Biglietti: {result.count} 
                   Data:{result.eventData.evento.data}
                   Prezzo Totale: {result.count * result.eventData.evento.prezzo}
                   
                <Button onClick={()=>handleModify(result.eventData.evento.id)}>Rimuovi un biglietto</Button>
                <Button onClick={()=>handleRemove(result.eventData.evento.id)}>Rimuovi Articolo</Button>
                
           </div>
          ))}

      </div>
      <Button onClick={handleempty}>Svuota carrello</Button>
      <Button onClick={()=>Checkout(results)}>Checkout</Button>
    </div>
  );
}

export default Cart