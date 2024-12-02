import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeForm from './Components/RecipeForm';
import RecipeList from './Components/RecipeList';
import  RecipeDetails from './Components/RecipeDetails';
import './App.css';

function App() {
  // Load recipes from localStorage or initialize with an empty array
  const savedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
  const [recipes, setRecipes] = useState(savedRecipes);

  // Update localStorage whenever recipes change
  useEffect(() => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
  }, [recipes]);

  const deleteRecipe = (recipeId) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== recipeId);
    setRecipes(updatedRecipes); // Update state
  };
  
  return (
    <Router>
      <div>
      <h1>GoodEats Recipes</h1>
      <p><b>Powered by React</b></p>
      <Routes>
        <Route path="/"
        element={ <><RecipeForm recipes={recipes} setRecipes={setRecipes} />
        <RecipeList recipes={recipes} deleteRecipe={deleteRecipe} /></>
          }
        />
        <Route path="/recipe/:id" element={<RecipeDetails recipes={recipes} />} />
        <Route
    path="/edit"
    element={<RecipeForm recipes={recipes} setRecipes={setRecipes} />}
/>
      </Routes>
    </div>
    
  </Router>
    
  );
}

export default App;
