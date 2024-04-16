
//aggiungi location
export async function RegisterLocation(props) {
    console.log(props)
    const text = {
        Nome: props.Nome,
        Longitudine: props.Longitudine,
        Latitudine: props.Latitudine,
        Indirizzo:props.Indirizzo,
        IdUtente: props.IdUtente,
        Immagine:props.Immagine
    }

    try {
        console.log(text)
        const response = await fetch(
            'http://localhost:5279/api/Location',
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
        console.log(data.message);
    } catch (error) {
        console.log(props)
        console.error(`Errore durante l'aggiunta della location: ${error.message}`);

    }
}
//location per id organizzatore
export async function OrganizerLocations(id){
    try {
        const response = await fetch(
            `http://localhost:5279/api/OrganizerLocations/${id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                
            }
        );
        if (!response.ok) {
            throw new Error(response.status);
        }
        const data = await response.json();
        
        return data   
    }
    catch(error){
        console.error(`Errore durante il recupero delle location: ${error.message}`);
    }
}
//location in base all'id
export async function Location(id){
    try {
        const response = await fetch(
            `http://localhost:5279/api/Location/${id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                
            }
        );
        if (!response.ok) {
            throw new Error(response.status);
        }
        const data = await response.json();
        return data   
    }
    catch(error){
        console.error(`Errore durante il recupero delle location: ${error.message}`);
    }
}   

export async function RemoveLocation(id){
    try {
        const response = await fetch(
            `http://localhost:5279/api/Location/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                
            }
        );
        if (!response.ok) {
            throw new Error(response.status);
        }
        const data = await response.json();
        return data.message   
    }
    catch(error){
        console.error(`Errore durante l'eliminazione della location: ${error.message}`);
    }
}

export async function UpdateLocation(props){
    console.log(props)
    const text = {
        Nome: props.Nome,
        Longitudine: props.Longitudine,
        Latitudine: props.Latitudine,
        Indirizzo:props.Indirizzo,
        IdUtente: props.IdUtente,
        Immagine:props.Immagine
    }

    try {
        console.log(text)
        const response = await fetch(
            `http://localhost:5279/api/Location/${props.id}`,
            {
                method: 'PUT',
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
        console.log(data.message);
    } catch (error) {
        console.log(props)
        console.error(`Errore durante l'aggiunta della location: ${error.message}`);

    }
}