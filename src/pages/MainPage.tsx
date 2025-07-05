import { useEffect, useState} from "react";
import type { RecipeInfo } from "../types/Recipes";
import RecipeCard from "../components/RecipeCard";

interface RandomRecipesResponse {
    recipes: RecipeInfo[]
}

interface SearchedRecipesResponse {
    results: RecipeInfo[];
}


function MainPage() { const [searchTerm,setSearchTerm] = useState<string | null>(null);
    const [randomRecipes,setRandomRecipes] = useState<RecipeInfo[] | null>(null);
    const [returnedRecipes,setReturnedRecipes] = useState<RecipeInfo[] | null>(null);

    const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;

    const fetchRandomRecipes = async () => {
        const response = await fetch(`https://api.spoonacular.com/recipes/random?number=9&apiKey=${apiKey}`);
        const data: RandomRecipesResponse = await response.json();
        setRandomRecipes(data.recipes)
    }

    const fetchSearchedRecipes = async (event: React.FormEvent) => {
        event.preventDefault();

        if(!searchTerm)
            return null;

        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&addRecipeInstructions=true&addRecipeNutrition=tru&addRecipeInformation=true&apiKey=${apiKey}&number=9&sort=popularity`)
        const data: SearchedRecipesResponse = await response.json();
        setReturnedRecipes(data.results);
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement> ) => {
        if(event.key === "Enter" && searchTerm !=="")
            fetchSearchedRecipes(event)
    }

    useEffect(()=>{
        fetchRandomRecipes()    
    },[])


    return (
        <main className="min-h-screen flex flex-col bg-[#121212] text-white">
            <section className="bg-[#2C2C2C] w-full p-8 lg:p-16">
                <div className="flex flex-col justify-center items-center space-y-1.5 max-w-4xl w-full mx-auto">
                    <h1 className="text-5xl font-bold">Find Your Perfect Recipe</h1>
                    <p className="text-xl">Discover thousands of delicious recipes for any meal, diet, or occasion.</p>
                    <form onSubmit={fetchSearchedRecipes} className="mt-6 bg-[#121212] w-full flex focus-within:ring-2 focus-within:ring-[#FC5185] rounded-lg transition-shadow duration-200">
                        <input className="grow px-4 py-2.5 outline-none " type="text" placeholder="Search for recipes or ingredients" onChange={(e)=>setSearchTerm(e.target.value)} onKeyDown={handleKeyDown} />
                        <button className="bg-[#FC5185] rounded-r-lg px-4 cursor-pointer hover:bg-[#FC5185]/80 transition-colors duration-300" type="submit">Search</button>
                    </form>
                </div>
            </section>

            <section className="p-8 lg:p-16 space-y-8">
                <h2 className="capitalize text-2xl font-semibold">random recipes</h2>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                   {
                    !returnedRecipes ?  
                        !randomRecipes ? (
                            <p>Loading recipes...</p>
                        ) : randomRecipes.map((recipe)=>(
                            <RecipeCard key={recipe.id} {...recipe} />
                        ))
                     : (
                        returnedRecipes.map((recipe)=>(
                            <RecipeCard key={recipe.id} {...recipe} />
                        ))
                    )
                   }
                </div>
            </section>
        </main>
    );
}

export default MainPage;