import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import './RecipeForm.css';

const RecipeForm = ({ recipes, setRecipes }) => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search); //creating an onject URLSearchParams to retrieve query string 
  const recipeId = params.get('id'); // Extracting the value of the id parameter from the query string.
  const [recipeInfos, setRecipeInfos] = useState({
    name: '',
    ingredients: '',
    steps: '',
    rating: '',
  });

  useEffect(() => {
    // Checking if a recip ID exists in the URL
    if (recipeId) {
      //Find the recipe that matches the selected ID in the lists of recipes
      const recipeToEdit = recipes.find((r) => r.id === recipeId);

      //If the recipe is found, set the details to editable
      if (recipeToEdit) {
        setRecipeInfos(recipeToEdit);
      }
    }
  }, [recipeId, recipes]);

  const handleInputChange = (e) => {
    // Find  the name and value of the event triggered
    const { name, value } = e.target;

     // Update the corresponding field in recipeInfos state
    // Use the name as the key to dynamically update the specific property
    setRecipeInfos({ ...recipeInfos, [name]: value }); //Spread the existing properties and update them
  };

  const saveRecipe = () => {
    if (!recipeInfos.name || !recipeInfos.ingredients || !recipeInfos.steps || !recipeInfos.rating) return;
//Stops function from running (saving) if all fields aren't filled
    if (recipeId) {
      // Update existing recipe
      const updatedRecipes = recipes.map((r) =>
        r.id === recipeId ? { ...r, ...recipeInfos } : r
      );
      setRecipes(updatedRecipes);
    } else {
      // Add new recipe
      const newRecipe = { id: uuidv4(), ...recipeInfos };
      setRecipes([...recipes, newRecipe]);
    }

    // Reset form and navigate back
    setRecipeInfos({ name: '', ingredients: '', steps: '', rating: '' });
    navigate('/');
  };

  return (
    <>
      {/* Prevent default form submission behavior */}
      <form onSubmit={(e) => e.preventDefault()}>
         {/* Input field for the recipe name */}
        <input
          type="text"
          name="name"
          value={recipeInfos.name}
          onChange={handleInputChange}
          placeholder="Recipe Name"
        />
        {/* Textarea for the ingredients */}
        <textarea
          name="ingredients"
          value={recipeInfos.ingredients}
          onChange={handleInputChange}
          placeholder="Ingredients"
        />
        {/* Textarea for the cooking steps */}
        <textarea
          name="steps"
          value={recipeInfos.steps}
          onChange={handleInputChange}
          placeholder="Cooking Steps"
        />
        {/* Input field for the rating (1-5 scale) */}
        <input
          type="number"
          name="rating"
          value={recipeInfos.rating}
          onChange={handleInputChange}
          placeholder="Rating (1-5)"
          min="1"
          max="5"
        />
          {/* Submit button for saving or creating a recipe */}
        <button type="submit" onClick={saveRecipe}>
          {/* Dynamically display either 'Save Changes' or 'Create Recipe' based on whether recipeId exists */}
          {recipeId ? 'Save Changes' : 'Create Recipe'}
        </button>
      </form>
    </>
  );
};

export default RecipeForm;
