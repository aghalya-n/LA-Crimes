import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Modal from "react-modal";
import './home.css';
import axios from 'axios';
const Home = () => {
  const [input, setInput] = useState("");
  const areas = [ {"name": '77th Street',
                    "num": 1},
                  {"name": 'Central',
                    "num": 2},
                  {"name": 'Devonshire', 
                  "num": 3},
                  {"name": 'Foothill',
                  "num": 4},
                  {"name": 'Harbor',
                  "num": 5},
                  {"name": 'Hollenbeck',
                  "num": 6},
                  {"name": 'Hollywood',
                  "num": 7},
                  {"name": 'Mission',
                  "num": 8},
                  {"name": 'N. Hollywood',
                  "num": 9},
                  {"name": 'Newton',
                  "num": 10},
                  {"name": 'Northeast',
                  "num": 11},
                  {"name": 'Olympic',
                  "num": 12},
                  {"name": 'Pacific',
                  "num": 13},
                  {"name": 'Rampart',
                  "num": 14},
                  {"name": 'Southeast',
                  "num": 15},
                  {"name": 'Southwest',
                  "num": 16},
                  { "name": 'Topanga',
                  "num": 17},
                  { "name": 'Van Nuys',
                  "num": 18},
                  {"name": 'West LA',
                  "num": 19},
                  {"name": 'West Valley',
                  "num": 20},
                  { "name": 'Wilshire',
                  "num": 21}
                ];

return (
<div className='report'>
  <h1>Update a crime to us:</h1>
    <form onSubmit={handleSubmit}>
      <label>
        Input:
        <input type="text" value={input} onChange={(e) => getReports(e.target.value)} />
      </label>

      <button type="search">Enter</button>
    </form>

    <Modal isOpen={isSubmitted} onRequestClose={handleModalClose} className="modal" overlayClassName="modal-overlay">
        <div className="modal-content">
          <h2 className="modal-title">Done!</h2>
          <button className="modal-close" onClick={handleModalClose}>Close</button>
        </div>
      </Modal>

</div>
);
};
  
export default Home;