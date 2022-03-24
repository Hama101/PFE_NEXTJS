import { callDjango } from "../../http"

//fecth recipes by qurey and page number
export async function fetchListOfRecipesByPageAndQuery(page, query) {
    const res = await callDjango.get(`/recipes/recipes-list/?page=${page}&query=${query}`);
    const data = await res.data;
    return data;
}

