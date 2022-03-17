import { callDjango } from "../../../controllers/http";

// here we call django api 

// this function will represent the whole register process
export default async (request, response) => {
    console.log("request aaaaaa", request.method);
    // test if the req is post
    if (request.method === "POST") {
        //distructuring the form data
        const { first_name, last_name, username, email, password, re_password } = request.body;
        console.log("im here");
        // test if the passwords match
        if (password === re_password) {
            try {
                const apiResponse = await callDjango.post("/accounts/register/", {
                    first_name,
                    last_name,
                    username,
                    email,
                    password,
                    re_password
                });
                // test if the api response is success
                console.log(apiResponse.data);
                if (apiResponse.status === 201) {
                    // redirect to the login page
                    return response.status(201).json(apiResponse.data)
                } else {
                    // if the api response is not success
                    // redirect to the register page
                    return response.status(apiResponse.status).json(apiResponse.data)
                }
            } catch (error) {
                response.status(500).json({
                    message: "something went wrong"
                });
            }
        } else {
            response.status(400).json({
                message: "passwords do not match"
            });
        }
    } else {
        // if the req is not post, send a bad request
        response.setHeader("Allow", ["POST"]);
        response.status(405).json({
            error: "Method not allowed"
        });
    }
}