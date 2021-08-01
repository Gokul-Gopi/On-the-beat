import React from 'react'
import '../pages/Category.css'
import CategoryCard from '../components/CategoryCard'
import { Link } from 'react-router-dom'

const Category = () => {
    return (
        <div className='category-page'>
            <p>Choose accordingly</p>
            <div className='category-container'>
                <Link to='/home'>
                    <CategoryCard image='https://images.unsplash.com/photo-1510915361894-db8b60106cb1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80' title='BEGGINER' />
                </Link>

                <Link to='/category'>
                    <CategoryCard image='https://images.unsplash.com/photo-1536047852989-10896cf70749?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80' title='INTERMEDIATE' />
                </Link>


                <Link to='/category'>
                    <CategoryCard image='https://images.unsplash.com/photo-1543062094-d22540cadf2d?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGd1aXRhcnxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60' title='PRO' />
                </Link>
            </div>
        </div>
    )
}

export default Category
