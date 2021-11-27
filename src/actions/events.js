import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch"
import { preparaEvents } from "../helpers/prepareEvents";
import { types } from "../types/types"


export const eventStartAddNew = (event) => {
    // Crea nuevo evento mediante petición POST al endpoint localhost:4000/api/events

    return async (dispatch, getState) => {

        const { uid, name } = getState().auth; // obtenemos uid y name del state para obtener el usuario activo y marcar el evento

        try {
            const resp = await fetchConToken('events', event, 'POST'); // Esta llamada requiere un token
            const body = await resp.json();
            // console.log(body)
            if (body.ok) {
                event.id = body.evento.id; // lee el id del evento recibido en el body
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


export const eventStartUpdate = (event) => {
    // Actualiza un evento mediante una petición PUT al endpoint localhost:4000/api/events/ + id evento
    return async (dispatch) => {

        try {
            const resp = await fetchConToken(`events/${event.id}`, event, 'PUT');
            const body = await resp.json();
            //console.log("UPDATING", body)
            if (body.ok) {
                dispatch(eventUpdated(event))
            } else {
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (error) {
            console.log(error)
            Swal.fire('Error', error, 'error')
        }
    }
}


const eventUpdated = (event) => ({ // permite actualizar un evento existente
    type: types.eventUpdated,
    payload: event
})


export const eventStartDelete = () => {
    // Elimina un evento mediante una petición DELETE al endpoint localhost:4000/api/events/ + id evento
    return async (dispatch, getState) => {

        const { id } = getState().calendar.activeEvent;
        // Obtenemos el id del evento a borrar del evento activo
        try {
            const resp = await fetchConToken(`events/${id}`, {}, 'DELETE');
            const body = await resp.json();
            if (body.ok) {
                dispatch(eventDeleted())
            } else {
                Swal.fire('Error', body.msg, 'error')
            }
        } catch (error) {
            console.log(error)
            Swal.fire('Error', error, 'error')
        }
    }
}

const eventDeleted = () => ({ // permite eliminar un evento existente
    type: types.eventDeleted
})


export const eventStartLoading = () => { // se dispara cuando el calendarScreen se muestra por primera vez a un user logueado
    // Lista todos los eventos disponibles mediante una petición GET al endpoint localhost:4000/api/events
    return async (dispatch) => {


        try {
            const resp = await fetchConToken('events', 'GET'); // El envío de GET se puede obviar porque es así por defect
            const body = await resp.json();
            console.log(body);

            const events = preparaEvents(body.eventos); // Leemos los eventos recibidos

            dispatch(eventLoaded(events)); // Los enviamos a eventLoaded para que los presente
            // Es necesario usar un helper para formatear las fechas (string) a fechas reales que pueda gestionar el calendar

        } catch (error) {
            console.log(error)
            Swal.fire('Error', error, 'error')
        }


    }

}

const eventLoaded = (events) => ({ // No necesita ser exportado porque solo se llama des de eventStartLoading
    type: types.eventLoaded,
    payload: events
})

export const eventLogout = () => ({
    type: types.eventLogout
})
