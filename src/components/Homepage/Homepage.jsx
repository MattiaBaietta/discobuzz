import immagine from './assets/img.webp'
import { Card } from 'react-bootstrap'
import img2 from './assets/img2.webp'
import img3 from './assets/img3.jpg'
import img4 from './assets/img4.jpg'

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
                <div className='eventi   d-flex coloretext align-items-center'>
                    <p style={{fontSize:"2em"}} className='w-50 text-center'>
                        Villa delle Rose Riccione
                    </p>
                    <img style={{height:"372px"}} src={img2} alt="img2" className='w-50' />
                </div>
                <div className='eventi2  d-flex coloretext align-items-center'>

                    <img style={{height:"372px"}} src={img3} alt="img3" className='w-50' />
                    <p style={{fontSize:"2em"}} className='w-50 text-center'>
                        Baia Imperiale <br></br>Gabicce
                    </p>
                </div>
                <div className='eventi2  d-flex coloretext align-items-center'>
                    <p style={{fontSize:"2em"}} className='w-50  text-center'>
                        Pacha <br></br>Ibiza
                    </p>
                    <img style={{height:"372px"}} src={img4} alt="img2" className='w-50' />
                </div>
            </div>
        </>
    )
}
export default Homepage;