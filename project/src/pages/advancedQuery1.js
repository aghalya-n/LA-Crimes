import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './advancedQuery1.css'

const AdvancedQuery1 = () => {
  const [res, setRes] = useState([])
  
  const handleClick = async () => {
    try {
      const response = await axios({
        url: 'http://127.0.0.1:5000/',
        method: 'GET',
        params: {
        AreaName: "xyz",
        numToCheck: 0
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
      <Link to="/">
        <button className="return-button" >Home</button>
      </Link>
      <Link to="/advancedQuery2">
        
        <button className="aq2-button" >Even More Info!</button>
    </Link>
      <Center><h1>See the number of ongoing crime investigations by crime type below!</h1></Center>
      <Center><button className="enter" onClick={handleClick}>Submit</button></Center>
      <Center><div className="output">
      <table>
        <tr>
           <td>Crime Description</td>
           <td>Num Open Investigations</td>
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
  
export default AdvancedQuery1;


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
