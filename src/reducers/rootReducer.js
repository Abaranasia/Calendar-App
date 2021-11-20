import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { calendarReducer } from "./calendarReducer";

import { uiReducer } from "./uiReducer";


export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calendarReducer,
    auth: authReducer
    // TODO: AuthReducer
})

/** Este reducer es una combinación de todos los reducers: UI, Autenticación y Calendar
 *  Recibe un objeto que representa el aspecto completo del store
 */



