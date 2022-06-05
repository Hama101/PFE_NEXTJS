import { callAI } from "../../http"
// import axios from 'axios';
// const BASE_LIVE_URL = "https://sea-of-food.herokuapp.com";


// TODO: refactor this code!!

// ? trying new stuff...
export const uploadImageByAxios = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const apiResponse = await callAI.post('/api/v1/predict', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
        return apiResponse.data
    } catch (err) {
        console.log("error : ", err);
        return false;
    }
    //fecth is better than axios cause it worked for me on mobile dunno why
}