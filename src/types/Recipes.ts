interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}

interface InstructionStep {
  step: string;
  number: number;
}

export interface RecipeInfo {
  id: number;
  title: string;
  image: string;
  aggregateLikes: number;
  servings: number;
  readyInMinutes: number;
  extendedIngredients: Ingredient[];
  analyzedInstructions: {
    name: string;
    steps: InstructionStep[];
  }[];
}
