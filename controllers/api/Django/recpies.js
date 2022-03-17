import { callDjango } from "../../http"

export default async function fetchListOfRecipesByPageAndQuery(page, query) {
    const res = await callDjango.get(`/recipes/recipes-list/?page=${page}&query=${query}`);
    const data = await res.data;
    return data;
}