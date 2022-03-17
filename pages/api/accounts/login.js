// we gonna use httpOnly cookies
import cookie from 'cookie';
import { callDjango } from "../../../controllers/http";


export default async (request, response) => {
    console.log("i m here aaaaaaaaa");
    if (request.method === "POST") {
        const { username, password } = request.body;
        // call django api for login
        try {
            const apiResponse = await callDjango.post("/accounts/login/", {
                username,
                password
            });
            // test if the api response is success
            // console.log("the response is ", apiResponse.data.access);
            if (apiResponse.status === 200) {
                // set the cookie
                response.setHeader("Set-Cookie", [
                    cookie.serialize(
                        'access', apiResponse.data.access, {
                        httpOnly: true, // so we can t access it from client js
                        secure: process.env.NODE_ENV !== 'development', // only send it over https when we need it
                        maxAge: 60 * 30,// life time like in backend 30min
                        sameSite: 'strict', //access from the same site
                        path: '/api/' // only send it to the api
                    }),
                    cookie.serialize(
                        'refresh', apiResponse.data.refresh, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV !== 'development',
                        maxAge: 60 * 60 * 24,
                        sameSite: 'strict',
                        path: '/api/'
                    })
                ]);
                return response.status(200).json({
                    success: "Logged in Successful",
                });
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
        response.setHeader("Allow", ["POST"]);
        response.status(405).json({
            error: "Method not allowed"
        });
    }
}
