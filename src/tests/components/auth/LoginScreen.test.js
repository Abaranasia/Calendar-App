import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import Swal from 'sweetalert2';

import { LoginScreen } from '../../../components/auth/LoginScreen';
import { startLogin, startRegister } from '../../../actions/auth';



jest.mock('../../../actions/auth', () => ({
    startLogin: jest.fn(),
    startRegister: jest.fn()
}))

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <LoginScreen />
    </Provider>
)

describe('<LoginScreen /> tests', () => {


    beforeEach(() => {
        jest.clearAllMocks()
    })


    test('should display properly', () => {

        expect(wrapper).toMatchSnapshot()
    });



    test('should call login dispatch', () => {

        wrapper.find('input[name="loginEmail"]').simulate('change', {
            target: {
                name: 'loginEmail',
                value: 'test@testing.com'
            }
        })

        wrapper.find('input[name="loginPassword"]').simulate('change', {
            target: {
                name: 'loginPassword',
                value: '1234567'
            }
        })

        wrapper.find('form').at(0).prop('onSubmit')({ //  Posición 0 para el form de login
            preventDefault() { }
        })

        expect(startLogin).toHaveBeenCalledWith('test@testing.com', '1234567')
    });



    test('testing different passwords', () => {

        // Simular 2 passwords diferentes
        wrapper.find('input[name="registerPassword1"]').simulate('change', {
            target: {
                name: 'registerPassword1',
                value: '1234567'
            }
        })

        wrapper.find('input[name="registerPassword2"]').simulate('change', {
            target: {
                name: 'registerPassword2',
                value: '12345'
            }
        })

        wrapper.find('form').at(1).prop('onSubmit')({ // Posición 1 para el form de registro
            preventDefault() { }
        })

        expect(startRegister).not.toHaveBeenCalled();
        expect(Swal.fire).toHaveBeenCalledWith('Error', 'Las contraseñas deben ser iguales', 'error');
    });


    test('startRegister should be called with same register passwords ', () => {
        wrapper.find('input[name="registerPassword1"]').simulate('change', {
            target: {
                name: 'registerPassword1',
                value: '1234567'
            }
        })

        wrapper.find('input[name="registerPassword2"]').simulate('change', {
            target: {
                name: 'registerPassword2',
                value: '1234567'
            }
        })

        wrapper.find('form').at(1).prop('onSubmit')({ // Posición 1 para el form de registro
            preventDefault() { }
        })

        expect(startRegister).toHaveBeenCalled();
        expect(Swal.fire).not.toHaveBeenCalled();
    });
})
