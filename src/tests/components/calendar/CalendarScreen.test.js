import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import Swal from 'sweetalert2';

import { CalendarScreen } from '../../../components/calendar/CalendarScreen';


/* jest.mock('../../../actions/auth', () => ({
    startLogin: jest.fn(),
    startRegister: jest.fn()
})) */

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: {
        uid: '123',
        name: 'testuser'
    },
    calendar: {
        events: []
    },
    ui: {
        modalOpen: false
    }
};


const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <CalendarScreen />
    </Provider>
)


describe('<CalendarScreen/> tests', () => {

    test('should display properly', () => {

        expect(wrapper).toMatchSnapshot();
    });
})
