import React, {useEffect, useState} from 'react';
import './home.css';
import axios from 'axios';

const Home = () => {
  //variable from text input
  const [AreaName, setAreaName] = useState("")

  const [crimes, setCrimes] = useState([])

  const handleClick = async () => {
    try {
      const response = await axios({
        url: 'http://127.0.0.1:5000/',
        method: 'GET',
        params: {
          AreaName: AreaName,
        },
      });

      const data = response.data;
      console.log(data);
      setCrimes(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  

  return (
    //what shows on page
   <div className="homePage">
    <Center><h1>Neighborhood Search!</h1></Center>

    <Center><div className="form">
    <Center><label>Enter Neighborhood Here: </label></Center>
    <Center><input type="text" name="areaName" value={AreaName} onChange={(e)=>setAreaName(e.target.value)}/></Center>

    <Center><button className="enter" onClick={handleClick}>Submit</button></Center>

    </div></Center>
    <Center><h5>You are searching for crimes in {AreaName}</h5></Center>
    {/* output data from sql query here NOT SURE HOW!!! */}
    {crimes}
   </div>
  );
};
export default Home;

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