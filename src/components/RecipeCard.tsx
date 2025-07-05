import { AiOutlineLike } from "react-icons/ai";
import { IoTimerOutline } from "react-icons/io5";
import type { RecipeInfo } from "../types/Recipes";
import { Link } from "react-router-dom";



function RecipeCard(recipe:RecipeInfo) {
    return (
        <article className="flex flex-col justify-between bg-[#1E1E1E] rounded-xl hover:-translate-y-1.5 transition-transform duration-300">
            <img className="w-full rounded-t-xl" src={recipe.image} alt={`image of ${recipe.title}`} />
            <div className="flex flex-col p-6 space-y-4">
                <p className="text-2xl font-semibold">{recipe.title}</p>
                <div className="flex justify-between items-center text-lg">
                   <p className="flex items-center space-x-1"><IoTimerOutline/> <span> {recipe.readyInMinutes} mins</span></p>
                    <p className="flex items-center space-x-1"><AiOutlineLike/> <span>{recipe.aggregateLikes}</span></p>
                </div>
                <Link to={`/recipes/${recipe.id}`} className="text-center py-2 bg-[#FC5185] font-medium rounded hover:bg-[#FC5185]/80 transition-colors duration-200 cursor-pointer" >View Recipe</Link>
            </div>
        </article>
    );
}

export default RecipeCard;