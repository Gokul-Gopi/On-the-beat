import React from 'react'
import './Header.css'
import { GiGuitarBassHead } from 'react-icons/gi'
import { FaUserCircle } from 'react-icons/fa'
import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'


const Navbar = () => {
    const { authState, authDispatch } = useAuth()
    const navigate = useNavigate()

    const onClickHandler = () => {
        if (authState.isLoggedIn) {
            localStorage.removeItem('userDetails')
            authDispatch({ type: 'RESET_USER' })
            window.location.reload()
        } else {
            navigate('/login')
        }
    }

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

            <div className='user-name'>
                <FaUserCircle className='user-icon' onClick={() => onClickHandler()} />
                {authState.isLoggedIn
                    ? <span>{authState.currentUserName}</span>
                    : <span>User</span>
                }
            </div>



        </nav>
    )
}

export default Navbar
