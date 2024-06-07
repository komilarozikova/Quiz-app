import React from 'react'
import { Link } from 'react-router-dom';
import accessibility from '../../assets/icon-accessibility.svg';
import '../Navbar/Navbar.css'

function Navbar() {
  return (
    <div>
        <div className='nav'>
               <div className='nav-container'>
               <img src={accessibility} alt="" />
                <Link className='home-link' to='/'><strong>Accessibility</strong></Link>
               </div>
              </div>
    </div>
  )
}

export default Navbar
