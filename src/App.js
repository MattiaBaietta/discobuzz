import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'leaflet-geosearch/dist/geosearch.css';
import 'leaflet/dist/leaflet.css';
import './App.css';
import MyNavbar from './components/Layout/Navbar/MyNavbar';
import Register from './components/User/Register';
import Homepage from './components/Homepage/Homepage';
import Login from './components/User/Login';
import Mylocations from './components/Locations/Mylocations';
import Createlocation from './components/Locations/Createlocation';
import LocationDetails from './components/Locations/LocationDetails';
import EventsOrganizer from './components/Events/EventsOrganizer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EventUser from './components/Events/EventsUser';



function App() {
  
  
  return (
    <div className="App">
      <BrowserRouter>
      <MyNavbar/>
      <Routes>
        <Route path="/*" element={
          <Homepage/>
        }>
        </Route>
        <Route path="/Events" element={
          <EventUser/>
        }></Route>
        <Route path="/MyLocations" element={
          <Mylocations/>
        }></Route>
        <Route path="/LocationDetails/:id" element={
          <LocationDetails/>
        }></Route>
        <Route path="/User" element={
          <Login/>
        }></Route>
         <Route path="/Register" element={
          <Register/>
        }></Route>
        <Route path="/Createlocation" element={
          <Createlocation/>
        }></Route>
      </Routes>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
