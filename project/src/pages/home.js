import React, {useEffect, useState} from 'react';
import './home.css';

const Home = () => {
  //variable from text input
  const [neighborhood, setNeighborhood] = useState("")
  const [myData, setMyData] = useState([{}])

  useEffect(() => {
    fetch('/create').then(
      response => response.json()
    ).then(data => setMyData(data.myData))
  }, []);

  return (
    //what shows on page
   <div className="homePage">
    <Center><h1>Neighborhood Search!</h1></Center>

    <Center><div className="form">
    <Center><label>Enter Neighborhood Here: </label></Center>
    <Center><input type="text" name="areaName" value={neighborhood} onChange={(e)=>setNeighborhood(e.target.value)}/></Center>

    <Center><button className="enter" onClick={useEffect}>Submit</button></Center>
    </div></Center>
    <Center><h5>You are searching for crimes in {neighborhood}</h5></Center>
    {/* output data from sql query here NOT SURE HOW!!! */}
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