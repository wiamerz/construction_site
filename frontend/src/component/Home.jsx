import React from 'react';
import myImage from "/src/assets/bg.jpg";
import Navbar from './Navbar';
function Home() {
    
    
  return (
    <>
    <Navbar/>
    <div className="h-screen w-full bg-cover bg-center" style={{ backgroundImage: `url(${myImage})` }}>
    <h1 className="text-white text-4xl font-bold flex justify-center items-center h-full">
    Snozy services for lasting qualite
    </h1>
  </div>
    </>
  )
}

export default Home




