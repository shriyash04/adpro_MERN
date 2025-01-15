import React from 'react'
import Header from './Header';
import Footer from './Footer';
import { Outlet, Route } from 'react-router';
import Sidebar from './Sidebar';
function Landing() {
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