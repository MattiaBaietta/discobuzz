import immagine from './assets/img.webp'
import { Card } from 'react-bootstrap'
import img2 from './assets/img2.webp'
import img3 from './assets/img3.jpg'
import img4 from './assets/img4.jpg'
import { Link } from 'react-router-dom'

import './Homepage.css'
const Homepage = () => {


    return (
        <>
            <div className='imgback d-flex justify-content-start'>

                <div className=' text-start px-4' >
                    <div className='homepage d-flex flex-column'>
                        <p>I MIGLIORI</p>
                        <span>EVENTI</span>
                        <p> INTORNO A TE</p>
                    </div>
                </div>

            </div>
            <div className='coloretext'>
                <h1 className='py-5'>
                    Scopri gli eventi più vicini con un solo click
                </h1>
                <div className='eventi  row coloretext align-items-center justify-content-between'>
                    <p  className='col-lg-6 testoeventi col-sm text-center'>
                        Villa delle Rose <br></br>Riccione
                    </p>
                    <Link className='col-lg-6 col-sm-12'  to="/LocationDetails/55">
                    <img className='immaginedisco ' src={img2}   />
                    </Link>
                </div>
                <div className='eventi2 row coloretext align-items-center justify-content-between'>
                    
                <p  className='testoeventi col-lg-6  col-sm text-center'>
                        Baia Imperiale <br></br>Gabicce
                    </p>
                    <Link className='col-lg-6 col-sm-12'  to="/LocationDetails/53">
                        <img className='immaginedisco' src={img3}   />
                        </Link>
                    
                </div>
                <div className='eventi2 row coloretext align-items-center justify-content-between'>
                    <p  className='col-lg-6 testoeventi  col-sm text-center'>
                        Pacha <br></br>Ibiza
                    </p>
                    <Link className='col-lg-6 col-sm-12' to="/LocationDetails/54">
                        <img  className='immaginedisco' src={img4}  />
                    </Link>
                </div>
            </div>
        </>
    )
}
export default Homepage;