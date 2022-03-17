import { callNext } from "../../http"

export const getUser = async () => {
    const response = await callNext.get("/accounts/user/");
    return response.data;
}