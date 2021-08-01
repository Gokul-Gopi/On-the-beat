import React from 'react'
import '../components/CategoryCard.css'

const CategoryCard = (props) => {
    return (
        <div className='category-card'>
            <div className='category-image-box'>
                <img src={props.image} alt="Category" />
            </div>
            <div className='category-title'><span>{props.title}</span></div>
        </div>
    )
}

export default CategoryCard
