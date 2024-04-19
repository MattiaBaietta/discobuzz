// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { EventListByUser } from "./EventsFunctions";
// import { PDFDownloadLink } from '@react-pdf/renderer';
// import { useRef } from "react";
// import { Document, Page, View, Text } from '@react-pdf/renderer';
// import QRCode from 'qrcode.react';
// import jsPDF from 'jspdf';


// const documentopdf=()=>{
//     <Document>
//     <Page>
//       <View>
//         <Text>Il tuo codice QR:</Text>
//         <QRCode value="https://example.com" />
//       </View>
//     </Page>
//   </Document>
// }



// const Mytickets = () => {

//     const iduser = useSelector(state => state.value);
//     const [events, setEvents] = useState([]);
//     const pdfRef = useRef();

//     useEffect(() => {
//         const fetchData = async () => {
//             const data = await EventListByUser(iduser);
//             setEvents(data);
//         }
//         fetchData();
//     }, [iduser]);

//     const generatePDF = () => {
//         const doc = new jsPDF();
//         doc.addImage(pdfRef.current, 'PNG', 10, 10, 100, 100);
//         doc.save('ticket.pdf');
//       };
//     return (
//         <div className="coloretext bgbottoni ">
//             <h1 className="eventilocation">
//                 I Miei Biglietti
//             </h1>
//             <div>
//                 {events.map((event) => (
//                     <div className="row eventilocation" key={event.id}>
//                         <img className="col-3" src={event.immagine}></img>
//                         <div className="col-9">
//                             <div className="d-flex justify-content-between">
//                                 <p>Nome location:</p>
//                                 <p>{event.nomeLocation}</p>
//                             </div>
//                             <div className="d-flex justify-content-between">
//                                 <p>Data:</p>
//                                 <p>{event.data.split('T')[0]}</p>
//                             </div>
//                             <div className="d-flex justify-content-between">
//                                 <p>Ora:</p>
//                                 <p> {event.data.split('T')[1]}</p>
//                             </div>
//                             <div className="d-flex justify-content-between">
//                                 <p>Biglietto numero:</p>
//                                 <p>{event.codBiglietto}</p>
//                             </div>
//                             <div className="d-flex justify-content-between">
//                                 <p>Nome evento:</p><p>{event.nomeEvento}</p>
//                             </div>

//                             <button className="btn">Stampa biglietto</button>
//                         </div>

//                     </div>

//                 ))}
//             </div>
//         </div>


//     )

// }
// export default Mytickets

import logo from '../Layout/Navbar/assets/logo.png';
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { EventListByUser } from "./EventsFunctions";
import QRCode from 'qrcode.react';
import jsPDF from 'jspdf';

const Mytickets = () => {

    const iduser = useSelector(state => state.value);
    console.log(iduser)
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await EventListByUser(iduser.userId);
            setEvents(data);
        }
        fetchData();
    }, [iduser]);

    const generatePDF = (event) => {
        const doc = new jsPDF();
        doc.addImage(logo, 'PNG', 20, 10, 80, 25);
        doc.text(`Nome location: ${event.nomeLocation}`, 20, 60);
        doc.text(`Nome evento: ${event.nomeEvento}`, 20, 100);
        doc.text(`Data: ${event.data.split('T')[0]}`, 20, 70);
        doc.text(`Ora: ${event.data.split('T')[1]}`, 20, 80);
        doc.text(`Biglietto numero: ${event.codBiglietto}`, 20, 90);
        
        const qrCodeDataURL = document.querySelector(`#qrCode${event.id}`).toDataURL("image/png");
        doc.addImage(qrCodeDataURL, 'PNG', 20, 120, 40, 40);
        const pdfData = doc.output('arraybuffer');
        const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(pdfBlob);
        window.open(pdfUrl, '_blank');
    };

    return (
        <div className="coloretext bgbottoni">
            <h1 className="eventilocation">I Miei Biglietti</h1>
            <div  className='eventilocation'style={{minHeight:"80vh"}} >
            {events.length ===0 ? (
                <h1  >Nessun biglietto acquistato</h1>
            ) : (
                events.map((event, index) => (
                    <div className="row eventilocation" key={event.id}>
                        <img className="col-3" src={event.immagine} alt={`Evento ${index + 1}`} />
                        <div className="col-9">
                            <div className="d-flex justify-content-between">
                                <p>Nome location:</p>
                                <p>{event.nomeLocation}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p>Data:</p>
                                <p>{event.data.split('T')[0]}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p>Ora:</p>
                                <p> {event.data.split('T')[1]}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p>Biglietto numero:</p>
                                <p>{event.codBiglietto}</p>
                            </div>
                            <div className="d-flex justify-content-between">
                                <p>Nome evento:</p>
                                <p>{event.nomeEvento}</p>
                            </div>
                            <QRCode id={`qrCode${event.id}`} value={event.codBiglietto} style={{ display: 'none' }} />
                            <button className="btn" onClick={() => generatePDF(event)}>Stampa biglietto</button>
                        </div>
                    </div>
                ))
            )}
            </div>
        </div>
    );
};

export default Mytickets;
