import immagine from './assets/img.webp'
import { Card } from 'react-bootstrap'
import img2 from './assets/img2.webp'
import './Homepage.css'
const Homepage=()=>{


return(
    <>
        <div  className='imgback d-flex justify-content-start'>
            
            <div className=' text-start px-4' >
                <div className='homepage d-flex flex-column'>
                    <p>I MIGLIORI</p>
                    <span>EVENTI</span>
                    <p> INTORNO A TE</p>
                </div>
            </div>
    
        </div>
        <div  className='d-flex coloretext align-items-center'>
            <p>
                Scopri gli eventi più vicini a te con un solo click
            </p>
            <img src={img2}  alt="img2" className='w-50'/>


        </div>
        <div  className='d-flex coloretext align-items-center'>
        <img src={img2}  alt="img2" className='w-50'/>
            <p>
                Scopri gli eventi più vicini a te con un solo click
            </p>
            


        </div>
    </>
)
}
export default Homepage;