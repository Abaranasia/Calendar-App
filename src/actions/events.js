import { types } from "../types/types"


export const eventAddnew = (event) => ({ // Añadir nuevo evento
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