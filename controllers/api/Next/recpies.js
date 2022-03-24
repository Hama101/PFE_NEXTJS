import { callNext } from "../../http"

//create new recipe
export async function createRecipe(recipe) {
    const res = await callNext.post("/recipes/create-recipe", recipe);
    console.log("res is : ", res);
    const data = await res.data;
    return data;
}