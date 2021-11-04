import { createStore, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import { rootReducer } from "../reducers/rootReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose; // Para usar las dev-tools ~ obtenido de dev-tools doc

/** El store es el corazón de la app y donde conluyen todos los reducers y middlewares
 * Empleamos composeEnhancers para poder filtrar el contenido del store a la extensión de dev-tools del navegador
 */

export const store = createStore(
    rootReducer, // Incluimos el reducer principal
    composeEnhancers(
        applyMiddleware(thunk)
    )

)