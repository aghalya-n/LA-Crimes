import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './advancedQuery2.css'
const AdvancedQuery2 = () => {
  const [res, setRes] = useState([])
  const [numToCheck, setVal] = useState(0)
  const handleClick = async () => {
    try {
      const response = await axios({
        url: 'http://127.0.0.1:5000/',
        method: 'GET',
        params: {
          AreaName: "abc",
          numToCheck: numToCheck
        },
      });

      const data = response.data
      console.log(data);
      setRes(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>

<   Link to="/">
        <button className="return-button" >Home</button>
      </Link>
      <Center><h1>See the districts where many crimes have happened by district ID below!</h1></Center>
      <Center><label>Enter Number of Crimes Here: </label></Center>
    <Center><input type="text" name="numCrimesBox" value={numToCheck} onChange={(e)=>setVal(e.target.value)}/></Center>
      <Center><button className="enter" onClick={handleClick}>Submit</button></Center>
      <Center><h5>You are searching for neighborhoods where more than {numToCheck} crimes have happened. </h5></Center>
      <Center><div className="output">
      <table>
        <tr>
           <td>Area Name</td>
           <td>District ID</td>
        </tr>
        {res.map((item) => (
  <tr>
    {item.map((d) => (
      <td>{d}</td>
    ))}
  </tr>
))}
       </table>
    </div></Center>
    </div>
  );
};
  
export default AdvancedQuery2;


function Center({children}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  );
}
