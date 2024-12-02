import { useParams } from 'react-router-dom';
import './RecipeDetails.css';
const RecipeDetails = ({ recipes }) => {
  const { id } = useParams();
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) return <p>Recipe not found!</p>;

  return (
    <div class= 'card'>
      <h2>{recipe.name}</h2>
      <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
      <p><strong>Steps:</strong> {recipe.steps}</p>
      <p><strong>Rating:</strong> {recipe.rating}/5</p>
    </div>
  );
};

export default RecipeDetails;
