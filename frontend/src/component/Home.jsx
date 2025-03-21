import React from 'react';
import myImage from "/src/assets/bg.jpg";
import about from "/src/assets/about.jpg"
import Navbar from './Navbar';
import Footer from './Footer';


const Home = () => {
    
    
  return (
    <>
    <Navbar/>


  <div className="h-screen w-full bg-cover bg-center" style={{ backgroundImage: `url(${myImage})` }}>
    <h1 className="text-white text-4xl font-bold flex justify-center items-center h-full">
    Snozy services for lasting qualite
    </h1>
  </div>


{/* -------------------------about us-----------------------*/}
  <div className='text-2xl m-15 font-bold text-red-600 flex justify-start items-center'>
     # About us
  </div>
 

 <div className='flex justify-around items-center  '>
    <div className=' text-black  text-lg w-100 m-15  '>
       <p>At Snozy we believe in innovation and excellence. Since our inception, 
        we have been committed to delivering high-quality solutions tailored to our clients' needs.
    </p>
       <p>Our Mission: To provide innovative services and products that simplify lives and create value.</p> 
    <p> Our Vision: To become a leader in our industry by combining expertise and passion.</p>
    <p>Our Values: Commitment, transparency, and continuous improvement.</p>
    <p>Our team of dedicated professionals works every day to deliver exceptional experiences and build a better future. </p>
      
    </div>
    <div className='flex justify-end '>
      <img 
       src={about}
        alt="" />
    </div>
    
 </div>
  
  {/* -------------------------affichage des produits-----------------------*/}

 <div className='text-2xl m-15 font-bold text-red-600 flex justify-start items-center'>
     # Projects
  </div>

<Footer/>
    </>
  )
}

export default Home;