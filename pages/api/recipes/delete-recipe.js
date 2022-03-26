// verfing token with the django backend here !
import cookie from 'cookie';
import { callDjango } from "../../../controllers/http";

export default async (request , response)=>{
    if (request.method === "POST") {
        const { slug } = request.body;
        // parse the cookies
        const cookies = cookie.parse(request.headers.cookie ?? '');
        // get the token from the cookies
        const access = cookies.access ?? false;
        if (access === false) {
            return response.status(403).json({
                error: "User forbidden from making the request",
            })
        }
        try {
            const apiResponse = await callDjango.delete(`/recipes/delete/${slug}/`, { 
                headers: {
                    Authorization: `token ${access}`
                }
            });
            if (apiResponse.status === 200 ) {
                
                console.log("Deleted recipe action success : ", apiResponse.data);
                return response.status(200).json({
                    success: "Recipe deleted successfully",
                })
            } else {
                return response.status(apiResponse.status).json(apiResponse.data)
            }
        }catch (error) {
            return response.status(500).json({
                error: "Something went wrong with verfication",
            })
        }
    } else {
        request.setHeader("Allow", ["POST"]);
        return response.status(405).json({
            error: "Method Not Allowed"
        });
    }

}