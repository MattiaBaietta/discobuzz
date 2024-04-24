

export async function RegisterEvent(props) {
    const text = {
        Nome: props.Nome,
        Descrizione: props.Descrizione,
        Data: props.Data,
        BigliettiTotali:props.BigliettiTotali,
        Prezzo:props.Prezzo,
        IdLocation: props.IdLocation,
        BigliettiVenduti:0,
        isActive:props.isActive,
        Immagine:props.Immagine,
    }

    try {
        console.log(text)
        const response = await fetch(
            'http://localhost:5279/api/Events',
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


export async function EventsListByLocation(id) {
    try {
        const response = await fetch('http://localhost:5279/api/EventsByLocation/' + id);
        if (!response.ok) {
            throw new Error(response.status);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Errore durante il recupero degli eventi: ${error.message}`);
    }
}

export async function ModifyEvent(props){
    console.log(props)
    const text = {
        Id:props.Id,
        Nome: props.Nome,
        Descrizione: props.Descrizione,
        Data: props.Data,
        BigliettiTotali:props.BigliettiTotali,
        Prezzo:props.Prezzo,
        IdLocation: props.IdLocation,
        BigliettiVenduti:0,
        Immagine:props.Immagine,
    }
    try {
        const response = await fetch(
            `http://localhost:5279/api/Events/${props.Id}`,
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
        console.log(data.message) 
    }
    catch(error){
        console.error(`Errore durante la modifica dell'evento: ${error.message}`);
    }

}
export async function RemoveEvent(id){
    try {
        const response = await fetch(
            `http://localhost:5279/api/Events/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message);
        }
        return data.message;
    }
    catch(error){
        console.error(`Errore durante la cancellazione dell'evento: ${error.message}`);
    }
}

export async function EventListByRange(props){
    const text = {
        range: props.range,
        userLat: props.y,
        userLon: props.x,
    }

    try {
        const response = await fetch(
            'http://localhost:5279/api/ViewEvents',
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
        return data;
    } catch (error) {
        console.error(`Errore durante l'aggiunta della location: ${error.message}`);

    }
}

export async function EventList(id){
    try {
        const response = await fetch(
            `http://localhost:5279/api/Events/${id}`,
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
        console.log(data)
        return data   
    }
    catch(error){
        console.error(`Errore durante il recupero delle location: ${error.message}`);
    }
}

export async function EventListByOrganizer(id){
    try {
        const response = await fetch(
            `http://localhost:5279/api/EventsByOrganizer/${id}`,
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
        console.log(data)
        return data   
    }
    catch(error){
        console.error(`Errore durante il recupero delle location: ${error.message}`);
    }
}

export async function EventListByUser(id){
    try {
        const response = await fetch(
            `http://localhost:5279/api/EventsByUser/${id}`,
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
        console.log(data)
        return data   
    }
    catch(error){
        console.error(`Errore durante il recupero degli eventi utente: ${error.message}`);
    }

}