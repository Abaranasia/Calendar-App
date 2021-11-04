import { combineReducers } from "redux";
import { calendarReducer } from "./calendarReducer";

import { uiReducer } from "./uiReducer";


export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer
    // TODO: AuthReducer
})

/** Este reducer es una combinación de todos los reducers: UI, Autenticación y Calendar
 *  Recibe un objeto que representa el aspecto completo del store
 */



