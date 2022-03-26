import { callNext } from "../../http"

//create new recipe
export async function createRecipe(recipe) {
    const res = await callNext.post("/recipes/create-recipe", recipe);
    console.log("res is : ", res);
    const data = await res.data;
    return data;
}

//delete a recipe by slug 
export async function deleteRecipe(slug){
    const apiResponse = await callNext.post(`/recipes/delete-recipe/`,{
        slug: slug
    });
    const data = await apiResponse.data;
    return data;
}