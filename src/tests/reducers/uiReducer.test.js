import { uiCloseModal, uiOpenModal } from "../../actions/ui";
import { uiReducer } from "../../reducers/uiReducer";

const initState = {
    modalOpen: false,
}

describe('uiReducer tests', () => {


    test('should return default state', () => {

        const state = uiReducer(initState, {});

        expect(state).toEqual(initState);
    });


    test('should open the modal view', () => {

        const modalOpen = uiOpenModal(); // Probamos a ver si se abre el modal
        const stateOpen = uiReducer(initState, modalOpen);

        expect(stateOpen.modalOpen).toBeTruthy();

        const modalClose = uiCloseModal(); // PRobamos a ver si se cierra el modal
        const stateClose = uiReducer(initState, modalClose);

        expect(stateClose.modalOpen).toBeFalsy();
    });



})
