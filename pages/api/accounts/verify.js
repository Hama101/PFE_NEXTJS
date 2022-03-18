// verfing token with the django backend here !
import cookie from 'cookie';
import { callDjango } from "../../../controllers/http";


export default async (request, response) => {
    if (request.method === "GET") {
        // parse the cookies
        const cookies = cookie.parse(request.headers.cookie ?? '');
        // get the token from the cookies
        const access = cookies.access ?? false;
        console.log(access);
        if (access === false) {
            return response.status(403).json({
                error: "User forbidden from making the request",
            })
        }
        try {
            const apiResponse = await callDjango.post('/accounts/verify-token/', {
                token: access,
            });
            if (apiResponse.status === 200) {
                console.log("verfication action success")
                return response.status(200).json({
                    success: "Authentication successful",
                })
            } else {
                return response.status(apiResponse.status).json(apiResponse.data)
            }

        } catch (error) {
            console.log("error is: ", error);
            return response.status(500).json({
                error: "Something went wrong with verfication",
            })
        }
    } else {
        request.setHeader("Allow", ["GET"]);
        return response.status(405).json({
            error: "Method Not Allowed"
        });
    }
}