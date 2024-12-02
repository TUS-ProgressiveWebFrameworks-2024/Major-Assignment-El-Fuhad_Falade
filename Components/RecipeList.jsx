import { Link } from 'react-router-dom';
import './RecipeList.css';
import { useNavigate } from 'react-router-dom';



const RecipeList = ({recipes, deleteRecipe})=>{
    //USe navigate to programmatically navigate to other routes
    const navigate = useNavigate();
    
    // Navigate to the edit page with the recipe ID
    const editRecipe = (id) => {
        navigate(`/edit?id=${id}`);
    };
    
   return(
    <div>
    <h2>Recipe List</h2>
    {/* List of recipes */}
    <ul>
        {recipes.map((recipe)=>(
            <li key = {recipe.id}>
                <span>{recipe.name}</span>

                {/*Link to view the full recipe details*/}
                <Link to={`/recipe/${recipe.id}`}>
                <button>View</button> {/* View button redirects */}
                </Link>

                  {/* Delete Recipe button */}
                <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>
                
                  {/* Edit Recipe button */}
                <button onClick={() => editRecipe(recipe.id)}>Edit</button>
            </li>
        ))}
    </ul>

</div>
   )
  
};
export default RecipeList;