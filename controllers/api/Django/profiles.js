import { callDjango } from "../../http"

//fecth recipes by qurey and page number
export async function fetchListOfResturantsByPageAndQuery(page, query) {
    const apiResponse = await callDjango.get(`/accounts/profiles-list/?page=${page}&query=${query}`);
    const data = await apiResponse.data;
    console.log("we found this resturants :", data);
    return data;
}

