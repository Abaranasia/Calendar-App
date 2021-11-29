import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import Swal from 'sweetalert2';

import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import { messages } from '../../../helpers/calendar-messages-es';
import { types } from '../../../types/types';
import { eventSetActive } from '../../../actions/events';
import { act } from 'react-dom/test-utils';


jest.mock('../../../actions/events', () => ({
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn(), //Para evitar que pete el anterior
}));

Storage.prototype.setItem = jest.fn(); //mock de localStorage

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


    test('calendar interactions tests', () => {
        // Probamos que el componente se pinta y para ello probamos algunos de sus props
        const calendar = wrapper.find('Calendar');
        const calendarMessages = calendar.prop('messages');

        expect(calendarMessages).toEqual(messages);

        calendar.prop('onDoubleClickEvent')(); // así puedo simular el disparo del evento si es síncrono
        expect(store.dispatch).toHaveBeenLastCalledWith({ type: types.uiOpenModal });

        calendar.prop('onSelectEvent')({ start: 'hola' }); //no importa qué le enviamos
        expect(eventSetActive).toHaveBeenCalledWith({ start: 'hola' })

        act(() => {
            calendar.prop('onView')('week');
            expect(localStorage.setItem).toHaveBeenLastCalledWith('lastView', 'week');
        })

    });

})
