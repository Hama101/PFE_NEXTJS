// we will combien all the reducers into one root reducer

import { combineReducers } from 'redux'
import authReducer from './auth'
import alertReducer from './alert'

export default combineReducers({
    auth: authReducer,
    alert: alertReducer
    //... when we create a new reducer we added here
})