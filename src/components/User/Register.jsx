import { Button } from "react-bootstrap"
import { RegisterSubmit } from "./UserFunctions"
import { useState } from "react";



const Register=()=>{

    const [formData, setFormData] = useState({
        Username: '',
        Password: '',
        Email: '',
        Nome: '',
        Cognome: '',
        Città: '',
        Cap: 0,
        Role:1
      });

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
       const  handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        const formDataToSend = {
            ...formData,
            Cap: parseInt(formData.Cap) 
        };
        RegisterSubmit(formDataToSend); // Chiamata alla funzione di registrazione con i dati del modulo
        
      };

    return(
        <form
          onSubmit={handleSubmit}
          className='d-flex w-100 align-items-center'
        >
        <div className="d-flex flex-column w-25">
                <div>
                    <label>Nome:</label>
                    <input type="text" name="Nome" id=""value={formData.Nome} onChange={handleChange}/>
                </div>
                <div>
                    <label>Cognome:</label>
                    <input type="text" name="Cognome" id=""value={formData.Cognome} onChange={handleChange} />
                </div>
                <div>
                    <label>Indirizzo E-mail:</label>
                    <input type="text" name="Email" id=""  value={formData.Email} onChange={handleChange}/>
                </div>
                <div>
                    <label>Città:</label>
                    <input type="text" name="Città" id="" value={formData.Città} onChange={handleChange}/>
                </div>
                <div>
                    <label>Codice Postale:</label>
                    <input type="number" name="Cap" id=""value={formData.Cap} min="0" step="1" onChange={handleChange}/>
                </div>
                <div>
                    <label>Username:</label>
                    <input type="text" name="Username" id="" value={formData.Username}  onChange={handleChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="text" name="Password" id="" value={formData.Password}  onChange={handleChange} />
                </div>
                <div>
                    <label>Sei un utente o un organizzatore di eventi?</label>
                    <select name="Role" id="" value={formData.Role} onChange={handleChange}>
                        <option value="1">Utente</option>
                        <option value="2">Organizzatore</option>
                    </select>
                </div>
                <Button type="submit">
                    Registrati!
                </Button>
        </div>
        </form>
    )
}
export default Register