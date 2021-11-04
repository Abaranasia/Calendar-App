import React from "react";

import { useDispatch } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';


export const AddNewFab = (params) => {
    /**Floationg Action Button (Fab) para crear un nuevo evento */

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(uiOpenModal()); // Hacemos el dispatch de la acción openModal al uiReducer 
    }

    return (
        <button
            className="btn  fab"
            onClick={handleClick}
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
