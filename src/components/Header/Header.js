import React from 'react'
import './Header.css'
import { GiGuitarBassHead } from 'react-icons/gi'
import { FaUserCircle } from 'react-icons/fa'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'


const Navbar = () => {

    const { authState } = useAuth()
    return (
        <nav className='navbar'>

            <Link to='/' className='header'>
                <GiGuitarBassHead className='header-icon' />
                <h2>On the beat!</h2>
            </Link>

            <div className='search-bar'>
                <input type="search" placeholder='Search' />
                <div className='search-icon-container'><FaSearch className='search-icon' /></div>
            </div>

            {authState.isLoggedIn
                ? <span className='user-greeting'>
                    Hey {authState.currentUserName}!
                </span>
                : <Link to='/login' className='nav-link'>
                    <FaUserCircle className='user-icon' />
                </Link>
            }


        </nav>
    )
}

export default Navbar
