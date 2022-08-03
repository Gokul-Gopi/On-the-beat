import React, { useEffect } from "react";
import "../Category/Category.css";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import { Link } from "react-router-dom";
import { networkCall } from "../../utils/networkCall";
import { useVideo } from "../../context/VideoContext";

const Category = () => {
  const { state, dispatch } = useVideo();

  useEffect(() => {
    const getCategories = async () => {
      if (!state.category) {
        const response = await networkCall("/category", "GET");
        response.status === 200 &&
          dispatch({
            type: "SET_CATEGORIES",
            payload: response.data.categories,
          });
      }
    };

    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setCategory = async (categoryID) => {
    dispatch({ type: "SET_CURRENT_CATEGORY", payload: categoryID });
    localStorage.setItem("Category", categoryID);
  };

  return (
    <div className="category-page">
      <p>Choose accordingly</p>
      <div className="category-container">
        {state.categories?.length < 1 ? (
          <div className="category-loading">
            <span>Loading categories...</span>
          </div>
        ) : (
          state.categories.map((category) => {
            return (
              <Link
                to="/videos"
                key={category._id}
                onClick={() => setCategory(category._id)}
              >
                <CategoryCard image={category.image} title={category.name} />
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Category;
