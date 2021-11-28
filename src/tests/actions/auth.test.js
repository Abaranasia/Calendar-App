import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import Swal from 'sweetalert2';

import { types } from '../../types/types';
import { startChecking, startLogin, startRegister } from "../../actions/auth";
import * as fetchModule from "../../helpers/fetch"

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();

let token = '';

describe('Auth tests', () => {

    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    });



    test('startLogin test', async () => {
        await store.dispatch(startLogin("josanrod442@gmail.com", "1234567"));
        const actions = store.getActions();
        // console.log(actions);

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: 'Jose Luis Sánchez Rodríguez'
            }
        });

        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));

        token = localStorage.setItem.mock.calls[0][1];
    });



    test('startLogin incorrect user test', async () => {

        await store.dispatch(startLogin("invalid@gg.com", "123456"));
        const actions = store.getActions();
        //console.log(actions);

        expect(actions).toEqual([]) // Debe ser [] por ser incorrecto
        expect(Swal.fire).toHaveBeenCalledWith("Error", "usuario o contraseña incorrectos", "error")
    });


    test('StartRegister tests', async () => {

        fetchModule.fetchSinToken = jest.fn(() => ({ // Debe devolver algo
            json() {
                return {
                    ok: true,
                    uid: "123",
                    name: 'newTest',
                    token: 'ABC123abc123'
                }
            }
        }))

        await store.dispatch(startRegister('test@test.com', '123456', 'Test'));

        const actions = store.getActions();
       // console.log(actions);

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'newTest'
            }
        });
        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String));
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number));
    });


    test('startChecking works well', async () => {

        fetchModule.fetchConToken = jest.fn(() => ({
            // Debemos repetir este mock porque de lo contrario no tendremos token, aunque lo mockeemos
            json() {
                return {
                    ok: true,
                    uid: "123",
                    name: 'newTest',
                    token: 'ABC123abc123'
                }
            }
        }));

        await store.dispatch(startChecking());
        const actions = store.getActions();

        //    localStorage.setItem('token', token); // Porque no da error, pero no hay token en la petición, pero aún así...

      //  console.log(actions)
        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC123abc123')
    });
})
