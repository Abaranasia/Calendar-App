import Swal from "sweetalert2";
import { fetchConToken, fetchSinToken } from "../helpers/fetch";
import { types } from "../types/types";
import { eventLogout } from "./events";


export const startLogin = (email, password) => {
    return async (dispatch) => { // Pongo este return porque es una tarea asíncrona. Dispatch proporcionado por thunk

        // console.log("AUTH: ", email, password);
        const resp = await fetchSinToken('auth', { email, password }, 'POST'); // Nuestro helper sin token
        const body = await resp.json();
        // console.log(body)

        if (body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime()) // Momento de inicio del token

            dispatch(login({ // Loguea en redux
                uid: body.uid,
                name: body.name
            }))
        } else {
            Swal.fire('Error', body.msg, 'error')
        }

    }
}


export const startRegister = (name, email, password) => {
    return async (dispatch) => {
        const resp = await fetchSinToken('auth/new', { name, email, password }, 'POST'); // Nuestro helper sin token
        const body = await resp.json();
        // console.log(body)

        if (body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime()) // Momento de inicio del token

            dispatch(login({ // Loguea en redux
                uid: body.uid,
                name: body.name
            }))
        } else {
            Swal.fire('Error', body.msg, 'error')
        }
    }
}


export const startChecking = () => { // Comprobamos que se ha renovado el token
    return async (dispatch) => {
        const resp = await fetchConToken('auth/renew', {}, 'GET'); // Nuestro helper sin token
        const body = await resp.json();
        console.log(body)

        if (body.ok) {
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime()) // Momento de inicio del token

            dispatch(login({ // Loguea en redux
                uid: body.uid,
                name: body.name
            }))
        } else {
            dispatch(checkingFinish())
            Swal.fire('Error', body.msg, 'error');
        }
    }
}


export const startLogout = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(eventLogout()); // limpia evento activo
        dispatch(eventLogout()); // limpia evento activo
        dispatch(logout());  //limpiar auth y localStorage
    }
}


const checkingFinish = () => ({ // Action para terminar el checking del token
    type: types.authCheckingFinish
})

const login = (user) => ({ // Action para login
    type: types.authLogin,
    payload: user
})

const logout = () => ({
    type: types.authLogout
})
