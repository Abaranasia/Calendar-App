import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch"
import { types } from "../types/types"


export const eventStartAddNew = (event) => {
    return async (dispatch, getState) => {

        const { uid, name } = getState().auth;

        try {
            const resp = await fetchConToken('events', event, 'POST');
            const body = await resp.json();
            console.log(body)
            if (body.ok) {
                event.id = body.evento.id;
                event.user = { // el usuario lo podemos sacar del state de redux con getState
                    _id: uid,
                    name: name
                }

                dispatch(eventAddNew(event))
            }
        } catch (error) {
            console.log(error)
            Swal.fire('Error', error, 'error')
        }
    }

}

const eventAddNew = (event) => ({ // Añadir nuevo evento, pero solo al guardar en la BBDD. Sin export por ser interna
    type: types.eventAddNew,
    payload: event
})


export const eventSetActive = (event) => ({ // Establecer como activo un evento (y mostrarlo en el modal)
    type: types.eventSetActive,
    payload: event
})


export const eventClearActiveNote = () => ({ // Elimina el evento activo
    type: types.eventClearActiveEvent
})


export const eventUpdated = (event) => ({ // permite actualizar un evento existente
    type: types.eventUpdated,
    payload: event
})


export const eventDeleted = () => ({ // permite eliminar un evento existente
    type: types.eventDeleted
})