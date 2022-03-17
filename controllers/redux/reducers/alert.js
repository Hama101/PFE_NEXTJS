import {
    SET_MESSAGE
} from '../actions/types'
// the initial state of the auth reducer
const initialState = {
    message: null,
    type: null,
}

// creating the auth reducer
const alertReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MESSAGE:
            return {
                ...state,
                message: action.payload.message,
                type: action.payload.type,
            }
        //Default state
        default:
            return state
    }
}
export default alertReducer