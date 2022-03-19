import {
    SET_RECIPES, SET_RECIPES_FAIL
} from '../actions/types'
// the initial state of the auth reducer
const initialState = {
    items: null,
    max_pages: null,
}

// creating the auth reducer
const recipesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_RECIPES:
            return {
                ...state,
                items: action.payload.data,
                max_pages: action.payload.max_pages,
            }
        case SET_RECIPES_FAIL:
            return {
                ...state,
            }
        //Default state
        default:
            return state
    }
}
export default recipesReducer