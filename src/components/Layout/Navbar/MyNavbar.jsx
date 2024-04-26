
import { Navbar, Nav } from "react-bootstrap"
import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6"
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
import {ToastContainer,toast} from "react-toastify";




const MyNavbar = () => {

    const dispatch = useDispatch();
    const [expanded, setExpanded] = useState(false);
    var isLoggedIn = useSelector(state => state.loggato);

    GetUserDetails();

    var role = useSelector(state => state.role);

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
        if(localStorage.getItem("loggato")=="false"){
            toast.success("Logout effettuato con successo!")
            localStorage.clear("loggato")
        }
        if(localStorage.getItem("loggato")=="false"){
            toast.success("Logout effettuato con successo!")
            localStorage.clear("loggato")
        }
        console.log(isLoggedIn)
    }, [isLoggedIn]);

    const Logout = () => {
        
        localStorage.removeItem('token');
        dispatch(islogged(false));
        localStorage.setItem("loggato","false")
        dispatch(getUser([], null));
        navigate('/');
        
    }
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const Login = async (e) => {
        e.preventDefault();
        if (formData.Username === '' || formData.Password === '') {
            toast.error("Inserire username e password");
            return;
        }
        try {
            const result = await LoginSubmit(formData);
            if (result != null) {
                dispatch(islogged(true));
                toast.success("Login effettuato con successo!");
                localStorage.setItem("loggato","true")
                formData.Username = '';
                formData.Password = '';
            } else {
                toast.error("Errore durante il login!");
            }
        } catch (error) {
            console.error("Errore durante il login:", error);
        }
    };


    return (
        <>
            <Navbar className='bgcustom p-0 fixed-top' expand="lg" expanded={expanded}>
                <Navbar.Brand className="py-0">
                    <Link to='/' className=''>
                        <img src={logo} style={{ width: "30vh", height: "100%" }} alt="" srcSet="" />
                    </Link>
                </Navbar.Brand>
                <Navbar.Toggle  aria-controls="responsive-navbar-nav" onClick={() => setExpanded(!expanded)} />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="coloretext me-auto prova">
                        {console.log("il ruolo"+role)}
                        {role == 1 ? (
                            <>
                                <Link className="nav-link " to="/MyLocations">Le mie Locations</Link>
                                <Link className="nav-link " to='/MyEvents'>I miei Eventi</Link>
                            </>
                        ) : role === null||role===undefined ? (
                            <>
                                <Link className="nav-link " to='/Events'>Eventi</Link>
                            </>
                        ) :
                            (
                                <>
                                    <Link className="nav-link " to='/MyTickets'>I miei Biglietti</Link>
                                    <Link className="nav-link " to='/Events'>Eventi</Link>
                                </>
                            )
                        }
                    </Nav>
                    {isLoggedIn ? (
                        <>
                            <Link className="nav-link coloretext me-2" to='/Cart'><FaCartShopping style={{ fontSize: "2em" }} /></Link>
                            <Dropdown className="bgbottone" >
                                <Dropdown.Toggle className="bgcustom border-0 bgbottone" id="dropdown-basic">
                                    <FaUser style={{ fontSize: "2em" }} className="coloretext" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className='dropdown-menu-end'>
                                    <Dropdown.Item as={Link} to="/MyProfile">Profilo</Dropdown.Item>
                                    {role == 1 ? (
                                        <>
                                            <Dropdown.Item as={Link} to="/MyLocations">Le mie location</Dropdown.Item>
                                            <Dropdown.Item as={Link} to="/Myevents">I miei eventi</Dropdown.Item>
                                        </>
                                    ) : <>
                                        <Dropdown.Item as={Link} to="/Mytickets">I miei biglietti</Dropdown.Item>
                                    </>}
                                    <Dropdown.Item onClick={Logout}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </>
                    ) : (
                        < >
                            <Link className="nav-link coloretext me-2" to='/Cart'><FaCartShopping style={{ fontSize: "2em" }} /></Link>
                            <Dropdown >
                                <Dropdown.Toggle className="bgcustom border-0 bgbottone " id="dropdown-basic">
                                    <FaUser style={{ fontSize: "2em" }} className="coloretext" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className=' coloretext bglogin bgbottoni' onMouseDown={(e) => e.stopPropagation()}>
                                    <form >
                                        <div className='d-flex flex-column'>
                                            <label className="mb-2" style={{ fontWeight: "bold", fontSize: "1.2em" }}>Login</label>
                                            <input className="inputtext rounded-3" type="text" name="Username" id="" placeholder="Username" value={formData.Username} onChange={handleChange} />
                                            <input className="inputtext rounded-3" type="text" name="Password" id="" placeholder="Password" value={formData.Password} onChange={handleChange} />
                                            <button className="btn my-2" onClick={(Login)} type="submit">Login</button>
                                            <label style={{ fontWeight: "bold", fontSize: "1.2em" }}>Non sei ancora <Link className=" fs-3" to='/Register' >Registrato?</Link> </label>
                                            
                                        </div>
                                    </form>
                                </Dropdown.Menu>
                            </Dropdown>
                        </>
                    )}
                </Navbar.Collapse>
            </Navbar>
        </>
       
    )
}
export default MyNavbar