import { types } from "../types/types";


const initialState = {
    modalOpen: false,
}

export const uiReducer = (state = initialState, action) => {

    /** Este reducer resuelve las acciones relacionadas con el UI
     * uiOpenModal/uiCloseModal --> Abre y cierra la ventana modal del evento
     */

    switch (action.type) {
        case types.uiOpenModal:

            return {
                ...state,
                modalOpen: true
            };

        case types.uiCloseModal:

            return {
                ...state,
                modalOpen: false
            };

        default:
            return state;
    }
}
