import { useSelector } from "react-redux";
import { GetUser } from "./UserFunctions";
import { useEffect } from "react";
import { useState } from "react";
import { UpdateUser } from "./UserFunctions";
import { toast } from "react-toastify";


const MyProfile = () => {

    const dati = useSelector(state => state.value);
    const [user, setUser] = useState([]);
    
    const [formData, setFormData] = useState({}); 

    useEffect(() => {
        GetUser(dati.userId)
            .then(data => {
                setUser(data);
                console.log(data)
                setFormData({
                    Id: data.id,
                    Nome: data.nome,
                    Cognome: data.cognome,
                    Email: data.email,
                    Città: data.città,
                    Cap: data.cap,
                    Username: data.username,
                    Password: data.password,
                    Role:data.role
                });
            })
            .catch(error => console.error("Errore nel caricamento dell'utente", error));
    }, [dati]);

    const handleChange = (e) => {
        setFormData(prevData => ({
            ...prevData,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    
        UpdateUser(formData, dati.userId)
            .then(() => {
                toast.success('Profilo modificato con successo')
            })
            .catch(error => {
                toast.error('Si è verificato un errore durante la modifica del profilo');
            });
    };
    

    return (
        <div className="d-flex justify-content-center eventilocation">

            <form
                onSubmit={handleSubmit}
                className='d-flex w-50 align-items-center justify-content-center bordo  my-3 pb-5'
            >
                <div className="w-100 d-flex flex-column  coloretext bgbottoni p-3">
                    <h1 className="py-3">Il tuo profilo</h1>
                    <div className="d-flex mb-4 justify-content-between">

                        <p style={{ fontSize: "1.5em" }}>Nome:</p>
                        <input type="text" style={{ fontSize: "1.2em" }} className="inputtext rounded-3" name="Nome" id=""  required value={formData.Nome || user.nome || ""} onChange={handleChange} />

                    </div>
                    <div className="d-flex mb-4 justify-content-between">
                        <p style={{ fontSize: "1.5em" }}>Cognome:</p>
                        <input type="text" style={{ fontSize: "1.2em" }} className="inputtext rounded-3" name="Cognome" id="" required value={formData.Cognome || user.cognome || ""} onChange={handleChange} />
                    </div>
                    <div className="d-flex  mb-4 justify-content-between">
                        <p style={{ fontSize: "1.5em" }}>E-mail:</p><input type="text" style={{ fontSize: "1.2em" }} required className="inputtext rounded-3" name="Email" id="" value={formData.Email || user.email || ""} onChange={handleChange} />
                    </div>
                    <div className="d-flex  mb-4 justify-content-between">

                        <p style={{ fontSize: "1.5em" }}>Città:</p><input type="text" style={{ fontSize: "1.2em" }} required className="inputtext rounded-3" name="Città" id="" value={formData.Città || user.città || ""} onChange={handleChange} />
                    </div>
                    <div className="d-flex  mb-4 justify-content-between">
                        <p style={{ fontSize: "1.5em" }}>Cap:</p><input type="text" style={{ fontSize: "1.2em" }} required className="inputtext rounded-3" name="Cap" id="" value={formData.Cap || user.cap || ""} onChange={handleChange} />
                    </div>
                    <div className="d-flex  mb-4 justify-content-between">
                        <p style={{ fontSize: "1.5em" }}>Username:</p><input type="text" style={{ fontSize: "1.2em" }} required className="inputtext rounded-3" name="Username" id="" value={formData.Username || user.username || ""} onChange={handleChange} />
                    </div>
                    <div className="d-flex  mb-4 justify-content-between">


                        <p style={{ fontSize: "1.5em" }}>Passsword:</p><input type="password" style={{ fontSize: "1.2em" }} required className="inputtext rounded-3" name="Password" id="" value={formData.Password || user.password || ""} onChange={handleChange} />
                    </div>

                    <button className="btn w-25 align-self-end" type="submit">
                        Modifica Profilo
                    </button>
                </div>
            </form>
        </div>
    );
}


export default MyProfile;