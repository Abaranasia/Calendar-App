import moment from "moment";
import { types } from "../types/types";


const initialState = {
    events: [
/*         { // For reference
            id: new Date().getTime(),
            title: 'Cumpleaños Ran',
            start: moment().toDate(),
            end: moment().add(2, 'hours').toDate(),
            //bgcolor: '#fafafa',
            notes: 'comprar pastel',
            user: {
                _id: 123,
                name: 'Ran Kirlian'
            },
        } */
    ],
    activeEvent: null // evento sobre el que hacemos click 
}

export const calendarReducer = (state = initialState, action) => {
    /**
     * Reducer del objeto Calendar: resuelve las acciones sobre el objeto Calendar
     */
    switch (action.type) {
        case types.eventSetActive:

            return {
                ...state,
                activeEvent: action.payload
            }

        case types.eventAddNew:

            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ],
            }

        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }

        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map( //buscamos el que queremos
                    e => (e.id === action.payload.id)
                        ? action.payload
                        : e
                )
            }

        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter( //devolvemos todos menos el elegido para borrar
                    e => (e.id !== state.activeEvent.id)
                ),
                activeEvent: null // vaciamos el evento activo
            }

        case types.eventLoaded:
            return {
                ...state,
                events: [...action.payload] // devuelve todos los eventos
            }

        case types.eventLogout:
            return {
                ...initialState
            }
        default:
            return state
    }
}
