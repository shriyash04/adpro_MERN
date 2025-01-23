import React, { useEffect } from 'react'
import Header from './Header';
import Footer from './Footer';
import { Outlet, Route, useNavigate } from 'react-router';
import Sidebar from './Sidebar';
function Landing() {
  const navigate = useNavigate();
  
  useEffect(()=>{
    let usertype = localStorage.getItem('usertype');
    console.log(usertype, "usertype");
    
    if(usertype == null || usertype === undefined){
      navigate('/');
    }
  }, []);
  

  return (
    <>
      <Header />
      <Sidebar />
      <main id="main" class="main">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Landing