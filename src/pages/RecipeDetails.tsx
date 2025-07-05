import { useEffect, useState } from "react";
import type { RecipeInfo } from "../types/Recipes";
import { useParams } from "react-router-dom";
import { PiForkKnife } from "react-icons/pi";
import { FaRegClock } from "react-icons/fa";

interface RecipeDetails extends RecipeInfo {
    summary: string;
}

function RecipeDetails() {
    const [recipeDetails, setRecipeDetails] = useState<RecipeDetails | null>(null);
    const {id} = useParams<{id: string}>();

    const fetchDetails = async () => {
        const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
        const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey}`);
        const data: RecipeDetails = await response.json();
        setRecipeDetails(data)
        console.log(data);
    }

    useEffect(()=>{
        fetchDetails();
    },[])

    return (
        <main className="min-h-screen h-full flex justify-center bg-[#121212] text-white">
            <div className="max-w-5xl w-full flex flex-col"> 
                {
                    !recipeDetails ? (
                        <p>Loading recipe details...</p>
                    ) : (
                        <>
                            <figure className="w- h-80 flex justify-center overflow-auto">
                            <img className="w-full object-cover" src={recipeDetails.image} alt="" />
                            </figure>

                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                <section className=" bg-[#FC5185] flex flex-col justify-between p-12 space-y-8">
                                    <div className="flex flex-col items-center space-y-2">
                                        <h1 className="text-4xl font-bold text-center">{recipeDetails.title}</h1>
                                        <div className="w-full h-0.5 bg-white"></div>
                                        <div className="flex items-center space-x-4 text-xl">
                                            <p className="space-x-2 flex items-center">
                                                <PiForkKnife/>
                                                <span>{recipeDetails.servings} serving(s)</span>
                                            </p>
                                            <p className="space-x-2 flex items-center">
                                                <FaRegClock/>
                                                <span>{recipeDetails.readyInMinutes} minutes</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <h2 className="uppercase text-2xl font-semibold">ingredients</h2>
                                        <ul>
                                            {
                                                recipeDetails.extendedIngredients.map(({amount,unit,name})=>(
                                                    <li>- {amount} {unit} {name}</li>
                                                ))
                                            }
                                        </ul>
                                    </div>

                                    <div className="space-y-2">
                                        <h2 className="uppercase text-2xl font-semibold">notes</h2>
                                        <p className="border border-white p-4 text-base" dangerouslySetInnerHTML={{__html: recipeDetails.summary}}>
                                        </p>
                                    </div>


                                </section>

                                <section className="p-12">
                                    <h2 className="uppercase text-2xl font-semibold">instructions</h2>
                                    <ul>
                                        {
                                            recipeDetails.analyzedInstructions[0].steps.map((instruction)=>(
                                                <li className="my-2"> <span className="font-bold text-lg">{instruction.number}.</span> {instruction.step}</li>
                                            ))
                                        }
                                    </ul>
                                </section>
                            </div>
                        </>

                        
                    )
                }
            </div>
        </main>
    );
}

export default RecipeDetails;