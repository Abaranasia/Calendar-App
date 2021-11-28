import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";


describe('authReducer tests', () => {

    const initState = {
        checking: true,
    }


    test('should return default state', () => {
        const action = {};
        const state = authReducer(initState, action);

        expect(state).toEqual(initState);
        // console.log(state)
    });



    test('Testing authLogin', () => {

        // La acción de Login no se exporta para que solo sea empleada desde dentro de auth por startLogin
        // Aunque podríamos exportarla en aras del testing, es más fácil copiar y enviar su cuerpo aquí

        const action = { // Action para login
            type: types.authLogin,
            payload: {
                uid: 123,
                name: 'testingUser'
            }
        }
        const state = authReducer(initState, action);
        //console.log(state)

        expect(state).toEqual({
            uid: 123,
            name: 'testingUser',
            checking: false,
        })


    });


    test('Testing authLogout', () => {

        const action = { // Action para logout
            type: types.authLogout
        }

        const state = authReducer(initState, action);
        //console.log(state)

        expect(state).toEqual({ checking: false })
    });

})
