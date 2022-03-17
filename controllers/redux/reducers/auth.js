// here we gonna manage the state of the auth reducer
import {
    REGISTER_SUCCESS, REGISTER_FAIL, RESET_REGISTER_SUCCESS,
    SET_AUTH_LOADING, REMOVE_AUTH_LOADING,
    LOGIN_SUCCESS, LOGIN_FAIL,
    LOGOUT_SUCCESS, LOGOUT_FAIL,
    LOAD_USER_SUCCESS, LOAD_USER_FAIL
} from '../actions/types'

// the initial state of the auth reducer
const initialState = {
    authenticated: false,
    loading: false,
    user: null,
    register_success: false,
}

// creating the auth reducer
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        // handel REGISTER_SUCCESS to redirect to login page
        case REGISTER_SUCCESS:
            return {
                ...state,
                register_success: true,
            }
        case REGISTER_FAIL:
            return {
                ...state,
                register_success: false,
            }
        case RESET_REGISTER_SUCCESS:
            return {
                ...state,
                register_success: false,
            }

        // handel SET_AUTH_LOADING to set the loading state to true or false
        case SET_AUTH_LOADING:
            return {
                ...state,
                loading: true,
            }
        case REMOVE_AUTH_LOADING:
            return {
                ...state,
                loading: false,
            }

        //handel login 
        case LOGIN_SUCCESS:
            return {
                ...state,
                authenticated: true,
                //user: action.payload,
            }
        case LOGIN_FAIL:
            return {
                ...state,
                authenticated: false,
                user: null,
            }

        // handel logout
        case LOGOUT_SUCCESS:
            return {
                ...state,
                authenticated: false,
                user: null,
            }
        case LOGOUT_FAIL:
            return {
                ...state,
            }

        //handel load user
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                authenticated: true,
                user: action.payload.user,
            }
        case LOAD_USER_FAIL:
            return {
                ...state,
            }
        //Default state
        default:
            return state
    }
}
export default authReducer