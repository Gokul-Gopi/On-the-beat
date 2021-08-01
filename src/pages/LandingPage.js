import React from 'react'
import '../pages/LandingPage.css'
import { GiGuitarBassHead } from 'react-icons/gi'
import { Link } from 'react-router-dom'

const LandingPage = () => {
    return (
        <div className='landing-page'>
            <div className='landing-page-container'>
                <div className='front-banner'>
                    <h1><GiGuitarBassHead />On the beat!</h1>
                </div>
                <div className='tagline'>One stop station for learning guitar</div>

                <Link to='/category'>
                    <div className='browse-btn-container'><button>Browse</button></div>
                </Link>

                <div className='login-sign-btns-container'>
                    <button className='login-btn'>Login</button>
                    <button className='signup-btn'>Sign up</button>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
