import { callDjango } from "../../http"

//fecth recipes by qurey and page number
export async function fetchListOfRecipesByPageAndQuery(page, query) {
    const res = await callDjango.get(`/recipes/recipes-list/?page=${page}&query=${query}`);
    const data = await res.data;
    return data;
}


//fecth recipe details by slug 
export async function fetchRecipeDetailsBySlug(slug) {
    const res = await callDjango.get(`/recipes/recipes-list/${slug}/`);
    const data = await res.data;
    console.log("Details : " , data);
    return data;
}
