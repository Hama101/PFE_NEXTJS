import {
    REGISTER_SUCCESS, REGISTER_FAIL, RESET_REGISTER_SUCCESS,
    SET_AUTH_LOADING, REMOVE_AUTH_LOADING,
    SET_MESSAGE,
    LOGIN_SUCCESS, LOGIN_FAIL,
    LOGOUT_SUCCESS, LOGOUT_FAIL,
    LOAD_USER_SUCCESS, LOAD_USER_FAIL,
    AUTHENTICATED_SUCCESS, AUTHENTICATED_FAIL,
    REFRESH_TOKENS_SUCCESS, REFRESH_TOKENS_FAIL
} from './types'
import { callNext } from '../../../controllers/http'

//gloabal fn
const alertDispatcher = (message, type) => dispatch => {
    dispatch({
        type: SET_MESSAGE,
        payload: {
            message: message,
            type: type
        }
    })
}

//in this action classes we call the loacl next js backend api

//load user action
export const loadUser = () => async dispatch => {
    // set loading state
    dispatch({
        type: SET_AUTH_LOADING
    })
    try {
        console.log("loadUser action try aaa")
        const apiResponse = await callNext.get("accounts/user/");
        // console.log("the request", apiResponse)
        if (apiResponse.status === 200) {
            console.log("load User action success")
            console.log("the user aaaaa", apiResponse.data);
            dispatch({
                type: LOAD_USER_SUCCESS,
                payload: apiResponse.data
            })
        } else {
            dispatch({
                type: LOAD_USER_FAIL,
            })
        }
    } catch (error) {
        console.log("error is aa", error)
        dispatch({
            type: LOAD_USER_FAIL,
        })
    }
    //remove loading state
    dispatch({
        type: REMOVE_AUTH_LOADING
    })
}

// verfication action
export const check_auth_status = () => async dispatch => {
    // set loading state
    dispatch({
        type: SET_AUTH_LOADING
    })
    try {
        const apiResponse = await callNext.get("accounts/verify/");
        if (apiResponse.status === 200) {
            console.log("verfication action success")
            dispatch({
                type: AUTHENTICATED_SUCCESS,
            })
            // we re dispatch load user cause we need to load the user data again after verfication (user:null)
            dispatch(loadUser())
        } else {
            dispatch({
                type: AUTHENTICATED_FAIL,
            })
        }
    } catch (error) {
        dispatch({
            type: AUTHENTICATED_FAIL,
        })
    }
    //remove loading state
    dispatch({
        type: REMOVE_AUTH_LOADING
    })
}

// refresh token action 
export const refresh_tokens = () => async dispatch => {
    // set loading state
    // dispatch({
    //     type: SET_AUTH_LOADING
    // })
    try {
        const apiResponse = await callNext.get("accounts/refresh/");
        if (apiResponse.status === 200) {
            console.log("refresh token action success")
            dispatch({
                type: REFRESH_TOKENS_SUCCESS,
            })
            //dispatch check_auth_status
            dispatch(check_auth_status())
        } else {
            dispatch({
                type: REFRESH_TOKENS_FAIL,
            })
        }
    } catch (error) {
        dispatch({
            type: REFRESH_TOKENS_FAIL,
        })
    }
    //remove loading state
    // dispatch({
    //     type: REMOVE_AUTH_LOADING
    // })
}

//action creater for register handler
export const register = (first_name, last_name, username, email, password, re_password) => async dispatch => {
    // set loading state
    dispatch({
        type: SET_AUTH_LOADING
    })
    try {
        console.log("register action try aaa")
        const apiResponse = await callNext.post("accounts/register/", {
            first_name,
            last_name,
            username,
            email,
            password,
            re_password
        });
        console.log("the request", apiResponse.data)
        if (apiResponse.status === 201) {
            console.log("register action success")
            dispatch({
                type: REGISTER_SUCCESS,
                //payload: apiResponse.data
            })
            dispatch(alertDispatcher("Successfully registered", "success"))
        } else {
            dispatch({
                type: REGISTER_FAIL,
                //payload: apiResponse.data
            })
            dispatch(alertDispatcher("Registration failed", "error"))
        }
    } catch (error) {
        if (error.response.status === 500) {
            console.log("User name already registered")
            dispatch(alertDispatcher("User name already registered", "error"))
        }
        if (error.response.status === 400) {
            console.log("Psswords must match")
            dispatch(alertDispatcher("Psswords must match", "error"))
        }
        dispatch({
            type: REGISTER_FAIL,
        })
    }
    dispatch({
        type: REMOVE_AUTH_LOADING
    })
}
// to reset register
export const resetRegister = () => dispatch => {
    //without async cause we will run this function in the same thread
    dispatch({
        type: RESET_REGISTER_SUCCESS
    })
}



//action creater for login handler
export const login = (username, password) => async dispatch => {
    // set loading state
    dispatch({
        type: SET_AUTH_LOADING
    })
    try {
        console.log("login action try aaa")
        const apiResponse = await callNext.post("accounts/login/", {
            username,
            password
        });
        // console.log("the request", apiResponse)
        if (apiResponse.status === 200) {
            console.log("login action success")
            dispatch({
                type: LOGIN_SUCCESS,
            })
            //dispatch the load user
            dispatch(loadUser())
            dispatch(alertDispatcher("Successfully logged in", "success"))
        } else {
            dispatch({
                type: LOGIN_FAIL,
            })
            dispatch(alertDispatcher("Login failed", "error"))
        }
    } catch (error) {
        console.log("error is aa", error)
        dispatch({
            type: LOGIN_FAIL,
        })
        dispatch(alertDispatcher("Login failed", "error"))
    }
    //remove loading state
    dispatch({
        type: REMOVE_AUTH_LOADING
    })
}

//action creater for logout handler
export const logout = () => async dispatch => {
    // set loading state
    dispatch({
        type: SET_AUTH_LOADING
    })
    try {
        console.log("logout action try aaa")
        const apiResponse = await callNext.post("accounts/logout/");
        // console.log("the request", apiResponse)
        if (apiResponse.status === 200) {
            console.log("logout action success")
            dispatch({
                type: LOGOUT_SUCCESS,
            })
            dispatch(alertDispatcher("Successfully logged out", "success"))
        } else {
            dispatch({
                type: LOGOUT_FAIL,
            })
            dispatch(alertDispatcher("Logout failed", "error"))
        }
    } catch (error) {
        console.log("error is aa", error)
        dispatch({
            type: LOGOUT_FAIL,
        })
        dispatch(alertDispatcher("Logout failed", "error"))
    }
    //remove loading state
    dispatch({
        type: REMOVE_AUTH_LOADING
    })
}

