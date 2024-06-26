

export async function CheckoutDB(utente,evento,quant){
    console.log("utente"+utente)
    console.log("evento"+evento)
    console.log("num biglietti"+quant)
    const text={
        idUtente:parseInt(utente),
        idEvento:evento,
        entrato:false,
    }
    console.log(text)
    try {
        const response = await fetch(
            `http://localhost:5279/api/UserEvents?nbiglietti=${quant}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(text),
            }
        );
        if (!response.ok) {
            throw new Error(response.status);
        }
        const data = await response.json();
        console.log(data.message)
    }
    catch(error){
        console.error(`Errore durante il checkout: ${error.message}`);
    }
}