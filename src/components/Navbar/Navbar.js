import React from 'react'
import '../Navbar/Navbar.css'
import { VscLibrary } from 'react-icons/vsc'
import { GoHistory } from 'react-icons/go'
import { AiOutlineHome } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <aside className='sidebar'>
            <div className='sidebar-container'>
                <Link to='/videos' className='sidebar-link'>
                    <div><AiOutlineHome className='icon' /></div>
                    <span>Home</span>
                </Link>

                <Link to='/library' className='sidebar-link'>
                    <div><VscLibrary className='icon' /></div>
                    <span>Library</span>
                </Link>

                <Link to='/watchlater' className='sidebar-link'>
                    <div><GoHistory className='icon' /></div>
                    <span>Watch Later</span>
                </Link>
            </div>
        </aside>
    )
}

export default Sidebar
