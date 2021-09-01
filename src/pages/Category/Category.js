import React, { useEffect } from 'react'
import '../Category/Category.css'
import CategoryCard from '../../components/CategoryCard/CategoryCard'
import { Link } from 'react-router-dom'
import { networkCall } from '../../utils/networkCall'
import { GiCondyluraSkull } from 'react-icons/gi'
import { useVideo } from '../../context/VideoContext'

const Category = () => {

    const { state, dispatch } = useVideo()

    useEffect(() => {

        const getCategories = async () => {
            if (!state.category) {
                const response = await networkCall('/category', "GET");
                response.status === 200 && dispatch({ type: 'SET_CATEGORIES', payload: response.data.categories })
            }
        }

        getCategories()

    }, []);

    const setCategory = async (event, categoryID) => {
        dispatch({ type: 'SET_CURRENT_CATEGORY', payload: categoryID })
        localStorage.setItem('Category', categoryID)
    }


    return (
        <div className='category-page'>
            <p>Choose accordingly</p>
            <div className='category-container'>

                {state.categories.map((category) => {
                    return (
                        <Link to='/videos' key={category._id} onClick={(e) => setCategory(e, category._id)}>
                            <CategoryCard image={category.image} title={category.name} />
                        </Link>)
                })}

            </div>
        </div>
    )
}

export default Category
