

import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/store";

export async function RegisterSubmit(props) {
  const text = {
    username: props.Username,
    password: props.Password,
    email: props.Email,
    nome: props.Nome,
    cognome: props.Cognome,
    città: props.Città,
    cap: props.Cap,
    role: props.Role
  };

  try {
    console.log(text);
    const response = await fetch(
      'http://localhost:5279/api/User',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(text),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Errore durante la registrazione');
    }

    console.log(data.message);
  } catch (error) {
    console.error(`Errore durante la registrazione: ${error.message}`);
    throw error; // Rilancia l'errore per consentire alla funzione chiamante di gestirlo
  }
}


export async function LoginSubmit(props) {


  const text = {
    username: props.Username,
    password: props.Password
  }
  try {
    console.log(text)
    const response = await fetch(
      'http://localhost:5279/api/Login',
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
    localStorage.setItem('token', data.token);
    return (data)


  } catch (error) {
    console.log(props)
    console.error(`${error.message}`);

  }
}


export function GetUserDetails() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  if (token) {
    const decoded = jwtDecode(token);
    dispatch(getUser(decoded, decoded.role));
    return decoded;
  }
  return null;
}

export async function GetUser(id) {
  try {

    const response = await fetch(
      'http://localhost:5279/api/User/' + id,
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
    return data;
  } catch (error) {
    console.error(`Errore durante la registrazione: ${error.message}`);

  }
}


export async function UpdateUser(formData,id){
  
  const text = {
      Nome: formData.Nome,
      Cognome: formData.Cognome,
      Città: formData.Città,
      Cap: formData.Cap,
      Username: formData.Username,
      Password: formData.Password,
      Email:formData.Email,
      Role:formData.Role
  }

  try {
      console.log(text)
      const response = await fetch(
          `http://localhost:5279/api/User/${id}`,
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
      console.error(`Errore durante l'aggiunta della location: ${error.message}`);

  }
}