// ! to remove this script

import {
    SET_RECIPES, SET_RECIPES_FAIL,
    SET_AUTH_LOADING, REMOVE_AUTH_LOADING,
} from './types'
import { callDjango } from '../../http'
import { fetchListOfRecipesByPageAndQuery } from '../../api/Django/recpies'

export const fetchListOfRecipesDispatcher = (page = 1, query = '') => async dispatch => {
    // set loading state
    console.log("i m here ! ", page, query);
    try {
        const apiResponse = await fetchListOfRecipesByPageAndQuery(page, query);
        const data = await apiResponse
        dispatch({
            type: SET_RECIPES,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: SET_RECIPES_FAIL,
        })
    }
}
