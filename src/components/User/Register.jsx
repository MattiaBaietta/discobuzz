import { Button } from "react-bootstrap"
import { RegisterSubmit } from "./UserFunctions"
import { useState } from "react";
import './User.css'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";



const Register = () => {
    const navigate=useNavigate();
    const [formData, setFormData] = useState({
        Username: '',
        Password: '',
        Email: '',
        Nome: '',
        Cognome: '',
        Città: '',
        Cap: '',
        Role: 1
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    
        const formDataToSend = { ...formData };
    
        RegisterSubmit(formDataToSend)
            .then(() => {
                toast.success('Registrazione avvenuta con successo! Si prega di effettuare il login.');
                console.log("Registrazione avvenuta con successo!");
                navigate('/');
            })
            .catch(error => {
                toast.warning(`Si è verificato un errore durante la registrazione: ${error.message}`);
                console.error("Si è verificato un errore durante la registrazione:", error);
            });
    };
    
    return (
        <div className="d-flex justify-content-center">

            <form
                onSubmit={handleSubmit}
                className='d-flex w-50 align-items-center justify-content-center bordo my-5  pb-5'
            >
                <div className="d-flex flex-column  coloretext bgbottoni">
                    <h1 className="py-3">Registrati</h1>
                    <div className="d-flex mb-4 justify-content-around">

                        <input type="text" style={{ fontSize: "1.2em" }} placeholder="Nome" className="inputtext rounded-3" name="Nome" id="" value={formData.Nome} onChange={handleChange} />
                        <input type="text" style={{ fontSize: "1.2em" }} placeholder="Cognome" className="inputtext rounded-3" name="Cognome" id="" value={formData.Cognome} onChange={handleChange} />
                    </div>
                    <div className="d-flex  mb-4 justify-content-around">
                        <input type="text" style={{ fontSize: "1.2em" }} placeholder="E-mail" className="inputtext rounded-3" name="Email" id="" value={formData.Email} onChange={handleChange} />
                        <input type="text" style={{ fontSize: "1.2em" }} placeholder="Città" className="inputtext rounded-3" name="Città" id="" value={formData.Città} onChange={handleChange} />
                    </div>
                    <div className="d-flex  mb-4 justify-content-around">
                        <input type="text" style={{ fontSize: "1.2em" }} placeholder="Codice Postale" className="inputtext rounded-3" name="Cap" id="" value={formData.Cap} onChange={handleChange} />
                    </div>

                    <div className="d-flex  mb-4 justify-content-around">

                        <input type="text" style={{ fontSize: "1.2em" }} placeholder="Username" className="inputtext rounded-3" name="Username" id="" value={formData.Username} onChange={handleChange} />
                        <input type="password" style={{ fontSize: "1.2em" }} placeholder="Password" className="inputtext rounded-3" name="Password" id="" value={formData.Password} onChange={handleChange} />
                    </div>
                    <div className="d-flex pb-3 justify-content-between">
                        <p className="m-0">Sei un utente o un organizzatore di eventi? </p>
                        <select name="Role" className="inputtext rounded-3" id="" value={formData.Role} onChange={handleChange}>
                            <option value="2">Utente</option>
                            <option value="1">Organizzatore</option>
                        </select>
                    </div>
                    <button className="btn" type="submit">
                        Registrati!
                    </button>
                </div>
            </form>
        </div>
    )
}
export default Register