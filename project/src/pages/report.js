import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from "react-modal";
import './report.css';
import axios from 'axios';

const Report = () => {
  const crimes = ['ARSON', 'ASSAULT WITH DEADLY WEAPON ON POLICE OFFICER', 'ASSAULT WITH DEADLY WEAPON, AGGRAVATED ASSAULT', 'ATTEMPTED ROBBERY', 'BATTERY - SIMPLE ASSAULT', 'BATTERY ON A FIREFIGHTER', 'BATTERY POLICE (SIMPLE)', 'BATTERY WITH SEXUAL CONTACT', 'BIKE - STOLEN', 'BOMB SCARE', 'BRANDISH WEAPON', 'BUNCO, ATTEMPT', 'BUNCO, GRAND THEFT', 'BUNCO, PETTY THEFT', 'BURGLARY', 'BURGLARY FROM VEHICLE', 'BURGLARY FROM VEHICLE, ATTEMPTED', 'BURGLARY, ATTEMPTED', 
  'CHILD ABUSE (PHYSICAL) - SIMPLE ASSAULT', 'CHILD NEGLECT (SEE 300 W.I.C.)', 'CONTEMPT OF COURT', 'CRIMINAL HOMICIDE', 'CRIMINAL THREATS - NO WEAPON DISPLAYED', 'CRM AGNST CHLD (13 OR UNDER) (14-15 & SUSP 10 YRS OLDER)', 'DEFRAUDING INNKEEPER/THEFT OF SERVICES, OVER $400', 'DISCHARGE FIREARMS/SHOTS FIRED', 'DISTURBING THE PEACE', 'DOCUMENT FORGERY / STOLEN FELONY', 'EMBEZZLEMENT, GRAND THEFT ($950.01 & OVER)', 'EMBEZZLEMENT, PETTY THEFT ($950 & UNDER)', 'EXTORTION', 'FAILURE TO YIELD',
  'FALSE IMPRISONMENT', 'GRAND THEFT / INSURANCE FRAUD', 'ILLEGAL DUMPING', 'INDECENT EXPOSURE', 'INTIMATE PARTNER - AGGRAVATED ASSAULT', 'INTIMATE PARTNER - SIMPLE ASSAULT', 'KIDNAPPING', 'LETTERS, LEWD  -  TELEPHONE CALLS, LEWD', 'LEWD CONDUCT', 'ORAL COPULATION', 'OTHER ASSAULT', 'OTHER MISCELLANEOUS CRIME', 'PANDERING', 'PICKPOCKET', 'PICKPOCKET, ATTEMPT', 'RAPE, ATTEMPTED', 'RAPE, FORCIBLE', 'RECKLESS DRIVING', 'RESISTING ARREST', 'ROBBERY', 'SEXUAL PENETRATION W/FOREIGN OBJECT', 'SHOPLIFTING - ATTEMPT', 
  'SHOPLIFTING - PETTY THEFT ($950 & UNDER)', 'SHOPLIFTING-GRAND THEFT ($950.01 & OVER)', 'SHOTS FIRED AT INHABITED DWELLING', 'SHOTS FIRED AT MOVING VEHICLE, TRAIN OR AIRCRAFT', 'SODOMY/SEXUAL CONTACT B/W PENIS OF ONE PERS TO ANUS OTH','THEFT FROM MOTOR VEHICLE - ATTEMPT', 'THEFT FROM MOTOR VEHICLE - GRAND ($400 AND OVER)', 'THEFT FROM MOTOR VEHICLE - PETTY ($950 & UNDER)', 'THEFT FROM PERSON - ATTEMPT', 'THEFT OF IDENTITY', 'THEFT PLAIN - ATTEMPT', 'THEFT PLAIN - PETTY ($950 & UNDER)',
  'THEFT-GRAND ($950.01 & OVER)EXCPT,GUNS,FOWL,LIVESTK,PROD', 'THEFT, PERSON', 'THREATENING PHONE CALLS/LETTERS','THROWING OBJECT AT MOVING VEHICLE','TRESPASSING','VANDALISM - FELONY ($400 & OVER, ALL CHURCH VANDALISMS)','VANDALISM - MISDEAMEANOR ($399 OR UNDER)','VEHICLE - ATTEMPT STOLEN','VEHICLE - STOLEN','VIOLATION OF COURT ORDER','VIOLATION OF RESTRAINING ORDER','VIOLATION OF TEMPORARY RESTRAINING ORDER']

  const areas = ['77th Street','Central','Devonshire','Foothill','Harbor','Hollenbeck','Hollywood','Mission','N. Hollywood',
  'Newton','Northeast','Olympic','Pacific','Rampart','Southeast','Southwest','Topanga','Van Nuys','West LA','West Valley','Wilshire',];
  const [ReportID, setReportID] = useState('');
  const [crimeType, setCrimeType] = useState(crimes[0]);
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [weaponUsed, setWeaponUsed] = useState('');
  const [area, setArea] = useState(areas[0]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios({
        url: 'http://127.0.0.1:5000/',
        method: 'POST',
        data: {
        ReportID,
        crimeType,
        area,
        address,
        date,
        weaponUsed,   
        }  
      });
      console.log(response.data);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios({
        url: 'http://127.0.0.1:5000/',
        method: 'DELETE',
        data: {
          ReportID,
        },
      });
      console.log(response.data);
      setIsDeleted(true);
    } catch (error) {
      console.error(error);
    }
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
          <select value={crimeType} onChange={(e) => setCrimeType(e.target.value)}>
            {crimes.map((a) => (<option key={a} value={a}>{a}</option>))}
          </select>
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
