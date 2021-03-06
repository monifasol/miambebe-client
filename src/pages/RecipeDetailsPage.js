import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import RecipeCard from "../components/recipes/RecipeCard";

const API_URI = process.env.REACT_APP_API_URL;


function RecipeDetailsPage(props) {
  const [recipe, setRecipe] = useState(null);
  const recipeId = props.match.params.id;

  const getRecipe = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URI}/recipes/${recipeId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneRecipe = response.data;
        setRecipe(oneRecipe);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <div className="RecipeDetails">
      {recipe && (
        <>
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
        </>
      )}

      {recipe &&
        recipe.tasks.map((task) => <RecipeCard key={task._id} {...task} />)}

      <Link to="/recipes">
        <button>Back to recipes</button>
      </Link>
    </div>
  );
}

export default RecipeDetailsPage;
