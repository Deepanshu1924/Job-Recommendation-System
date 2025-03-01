import React, { useState } from 'react'
import { Certification , Footer, Header , Hiring , InterShip , Slider } from './Component';
import Login from './Login';


const Container = () => {
  const [login , setlogin] = useState(true);
   const log = (e) =>{
    e.preventDefault();
     setlogin(false);
   };

   const lod = (e) =>{
    if(e.target.name){
      e.preventDefault();
       setlogin(true);
    }
   }


  return (
    <div>
     { login ? <div>
      <Header log = { log }/>
      <hr />
      <Slider />
      <Certification />
      <Hiring />
      <InterShip />
      <Footer />
      </div> : <Login lod={ lod }/> }
    </div>
  )
}

export default Container;
