import { callNext } from "../../http"
import { logout } from '../../redux/actions/auth'

export const newtLogOutHandler = (dispatch) => {
    if (dispatch && dispatch !== null && dispatch !== undefined) {
        dispatch(logout());
        setTimeout(() => {
            window.location = '/'
        }, 2000)
    }
}