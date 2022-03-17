import cookie from 'cookie';
import { callDjango } from "../../../controllers/http";

export default async (request, response) => {
    //retieve user by token from cookies
    if (request.method === "GET") {
        const cookies = cookie.parse(request.headers.cookie ?? '');
        const access = cookies.access ?? false;

        //if no access token, return 401
        if (access === false) {
            response.status(401).json({
                message: "you are not logged in"
            });
        }
        // call django api for login
        try {
            const apiResponse = await callDjango.get("/accounts/user/", {
                headers: {
                    Authorization: `token ${access}`
                }
            });
            // test if the api response is success
            // console.log("the response is ", apiResponse.data.access);
            if (apiResponse.status === 200) {
                return response.status(200).json(apiResponse.data);
            } else {
                // if the api response is not success
                return response.status(apiResponse.status).json(apiResponse.data);
            }
        } catch (err) {
            console.log("error in calling django", err);
            response.status(500).json({
                message: "something went wrong"
            });
        }
    } else {
        response.setHeader("Allow", ["GET"]);
        response.status(405).json({
            error: "Method not allowed"
        });
    }
};