import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from "react-modal";
import './report.css';

const Report = () => {

  const areas = ['77th Street','Central','Devonshire','Foothill','Harbor','Hollenbeck','Hollywood','Mission','N. Hollywood',
  'Newton','Northeast','Olympic','Pacific','Rampart','Southeast','Southwest','Topanga','Van Nuys','West LA','West Valley','Wilshire',];
  const [ReportID, setReportID] = useState('');
  const [crimeType, setCrimeType] = useState('');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [weaponUsed, setWeaponUsed] = useState('');
  const [area, setArea] = useState(areas[0]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can handle the form submission and send the data to the server
    console.log({ crimeType, address, date, weaponUsed, area });
    setIsSubmitted(true);
  };

  const handleDelete = () => {
    // Here you can handle the delete operation and set isDeleted to true
    setIsDeleted(true);
  };

  const handleModalClose = () => {
    setIsSubmitted(false);
    setIsDeleted(false);
  };
  
  return (
    <div className='report'>
      <h1>Update a crime to us:</h1>
      <form onSubmit={handleSubmit}>

        <label>
          ReportID:
          <input type="text" value={ReportID} onChange={(e) => setReportID(e.target.value)} />
        </label>

        <label>
          Crime Type:
          <input type="text" value={crimeType} onChange={(e) => setCrimeType(e.target.value)} />
        </label>

        <label>
          Area:
          <select value={area} onChange={(e) => setArea(e.target.value)}>
            {areas.map((a) => (<option key={a} value={a}>{a}</option>))}
          </select>
        </label>

        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>

        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>

        <label>
          Weapon Used:
          <input type="text" value={weaponUsed} onChange={(e) => setWeaponUsed(e.target.value)} />
        </label>

        <button type="submit">Submit</button>

        <button className="delete-button" onClick={handleDelete}>Delete</button>

      </form>

      <Modal isOpen={isSubmitted} onRequestClose={handleModalClose} className="modal" overlayClassName="modal-overlay">
        <div className="modal-content">
          <h2 className="modal-title">Submitted Successfully!</h2>
          <button className="modal-close" onClick={handleModalClose}>Close</button>
        </div>
      </Modal>

      <Modal isOpen={isDeleted} onRequestClose={handleModalClose} className="modal" overlayClassName="modal-overlay">
        <div className="modal-content">
          <h2 className="modal-title">Deleted Successfully!</h2>
          <button className="modal-close" onClick={handleModalClose}>Close</button>
        </div>
      </Modal>


      <Link to="/">
        <button className="return-button" >Home</button>
      </Link>

    </div>
  );  
};
  
export default Report;
