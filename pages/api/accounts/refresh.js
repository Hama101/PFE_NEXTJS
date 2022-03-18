// using refresh token to call django api and refresh the token
import cookie from 'cookie';
import { callDjango } from "../../../controllers/http";

// and updating the saved tokens in the cookies
export default async (request, response) => {
    if (request.method === 'GET') {
        // parse the cookies
        const cookies = cookie.parse(request.headers.cookie ?? '');
        // get the token from the cookies
        const refresh = cookies.refresh ?? false;
        // console.log(refresh);
        if (refresh === false) {
            return response.status(403).json({
                error: "User forbidden from making the request",
            })
        }

        try {
            const apiResponse = await callDjango.post('/accounts/refresh-token/', {
                refresh: refresh,
            });
            if (apiResponse.status === 200) {
                // update the cookies
                response.setHeader("Set-Cookie", [
                    cookie.serialize(
                        'access', apiResponse.data.access, {
                        httpOnly: true, // so we can t access it from client js
                        secure: process.env.NODE_ENV !== 'development', // only send it over https when we need it
                        maxAge: 60 * 30,// life time like in backend 30min
                        sameSite: 'strict', //access from the same site with csrf
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
                console.log("refreshed action success")
                return response.status(200).json({
                    success: "Refreshed successful",
                })
            } else {
                return response.status(apiResponse.status).json(apiResponse.data)
            }

        } catch (error) {
            console.log("error is: ", error);
            return response.status(500).json({
                error: "Something went wrong with refreshing",
            })
        }
    } else {
        response.setHeader('Allow', ['GET']);
        response.status(405).json({
            error: `Method ${request.method} Not Allowed`
        });
    }
}