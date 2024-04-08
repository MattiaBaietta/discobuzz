
import { Navbar } from "react-bootstrap"
import { Link } from "react-router-dom"
import logo from './assets/logo.png'
import './MyNavbar.css'
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import { islogged } from "../../../redux/store";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router";
import { LoginSubmit } from "../../User/UserFunctions";
import { getUser } from "../../../redux/store";
import { GetUserDetails } from "../../User/UserFunctions";




const MyNavbar = () => {
    const dispatch = useDispatch();
    var isLoggedIn = useSelector(state => state.loggato);
    GetUserDetails();
    var role=useSelector(state=>state.role);
    
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        Username: '',
        Password: '',
        
      });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            dispatch(islogged(true));
            
            
        }
    }, [dispatch]);

    const Logout = () => {
        localStorage.removeItem('token');
        dispatch(islogged(false));
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
      const  handleSubmit = async (e) => {
        e.preventDefault();
              
        var a=await LoginSubmit(formData); 
        if(a!=null){
            dispatch(getUser(a.userId,a.role));   
            dispatch(islogged(true));
            navigate('/');
        }
      };


    return (
        <Navbar className='bgcustom p-0 justify-content-between'>
            <Link to='/' className=''>
                <img src={logo} style={{ width: "30vh", height: "100%" }} alt="" srcSet="" />
            </Link>

            <div>
                
            {role === 2 ? (
                <>
                    <Link to='/MyLocations'>
                    Le mie Locations
                </Link>
                <Link to='/MyEvents'>
                I miei Eventi
            </Link>
                </>
            ):
                <>
                    <Link to='/MyTickets'>
                    I miei Biglietti
                    </Link>    
                    <Link to='/Events'>
                    Eventi
                    </Link>

                    {/* //da mettere solo admin */}
                    <Link to='/MyLocations'> 
                    Le mie Locations
                </Link>
                <Link to='/MyEvents'>
                I miei Eventi
            </Link>
                </>
            }
            
                
            </div>

            {isLoggedIn ? (
                
                <div>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            ci metterei solo l'icona
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to="/Profilo">Profilo</Dropdown.Item>
                            {role === 2 ? (
                                <>
                                    <Dropdown.Item as={Link} to="/CreateEvent">Crea Evento</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/MyLocations">Le mie location</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/Myevents">I miei eventi</Dropdown.Item>   
                                </>
                            ) : <>
                                      
                                    <Dropdown.Item as={Link} to="/Mytickets">I miei biglietti</Dropdown.Item>
                                </>}
                            
                            
                            <Dropdown.Item onClick={Logout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            ) : (
                <div className='ps-4 '>
                <Dropdown >
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        icona
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='dropdown-menu-end ' onMouseDown={(e) => e.stopPropagation()}>
                        
                            <form onSubmit={handleSubmit}>
                                <div className='d-flex flex-column'>
                                    <label>Login</label>
                                    <input type="text" name="Username" id="" placeholder="Username" value={formData.Username} onChange={handleChange} />
                                    <input type="text" name="Password" id="" placeholder="Password" value={formData.Password} onChange={handleChange} />
                                    <button type="submit">Login</button>
                                    {/* <label>Dimenticato la password?</label>da impostare il reset password */}
                                    <label>Non sei ancora registrato?</label>
                                    <button type="submit">
                                    <Link to='/Register'>Registrati</Link></button>
                                </div>
                            </form>
                        
                        
                    </Dropdown.Menu>
                </Dropdown>
                </div>   

                // <Link to='/User' className='p-3'>Login</Link>
            )}

        </Navbar>
    )
}
export default MyNavbar