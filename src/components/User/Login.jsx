import { Button } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import { LoginSubmit } from "./UserFunctions";
import { useDispatch,useSelector } from 'react-redux';
import {islogged } from '../../redux/store';


const Login=()=>{
    
    const dispatch=useDispatch(); 
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Username: '',
        Password: '',
        
      });

      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
       const  handleSubmit = async (e) => {
        e.preventDefault();
              
        var a=await LoginSubmit(formData); 
        if(a!=null){
  
            dispatch(islogged(true));
            navigate('/');
        }
      };

    return(
        
           <form onSubmit={handleSubmit} className='d-flex w-100 align-items-center'>
                <label>User:</label>
                <input type="text" name="Username" id="" value={formData.Username} onChange={handleChange} />
                <label>Password:</label>
                <input type="text" name="Password" id="" value={formData.Password} onChange={handleChange} />
                <Button type="submit">Login</Button>
    
                <label>
                    Non sei ancora registrato? 
                    <Link to="/Register">Clicca qui</Link>
                </label>
            
           </form>
    )
}
export default Login