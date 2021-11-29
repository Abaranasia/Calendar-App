import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import moment from 'moment';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

import Swal from 'sweetalert2';

import { CalendarModal } from '../../../components/calendar/CalendarModal';
import { eventStartUpdate, eventClearActiveNote, eventStartAddNew } from '../../../actions/events';


jest.mock('../../../actions/events', () => ({
    eventStartUpdate: jest.fn(),
    eventStartAddNew: jest.fn(),
    eventClearActiveNote: jest.fn(), //Para evitar que pete el anterior
}));


const middlewares = [thunk];
const mockStore = configureStore(middlewares);


const now = moment().minutes(0).seconds(0).add(1, 'hours'); // Esto establece el momento inicial no ahora si no a la próxima hora punta posible
const later = now.clone().add(1, 'hours'); //función de moment que clona otro momento


const initState = {
    auth: {
        uid: '123',
        name: 'testuser'
    },
    calendar: {
        events: [],
        activeEvent: {
            title: 'Evento',
            notes: 'prueba',
            start: now.toDate(),
            end: later.toDate()
        }
    },
    ui: {
        modalOpen: true
    }
};


const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <CalendarModal />
    </Provider>
)


describe('<CalendarModal/> tests', () => {

    test('should display the modal component properly', () => {

        expect(wrapper.find('.modal').exists()).toBeTruthy()
        expect(wrapper.find('Modal').prop('isOpen')).toBeTruthy()
    });

    test('should call the update action and close modal', () => {

        wrapper.find('form').simulate('submit', {
            preventDefault() { }
        })

        expect(eventStartUpdate).toHaveBeenCalledWith(initState.calendar.activeEvent);
        expect(eventClearActiveNote).toHaveBeenCalled();
    });



    test('should display an error if there is no title in the form', () => {
        // Esta prueba hace submit con el form vacío porque en la anterior se cerró y debió limpiarse (aunque no y lo forzamos)

        //wrapper.find('input[name="title"]').value = '';
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title', value: ''
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault() { }
        });

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBeTruthy()
    });


    test('should create a new event', () => {

        const initState = {
            auth: {
                uid: '123',
                name: 'testuser'
            },
            calendar: {
                events: [],
                activeEvent: null
            },
            ui: {
                modalOpen: true
            }
        };

        const store = mockStore(initState);
        store.dispatch = jest.fn();

        const wrapper = mount(
            <Provider store={store}>
                <CalendarModal />
            </Provider>
        )

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title', value: 'hola pruebas'
            }
        });

        wrapper.find('form').simulate('submit', {
            preventDefault() { }
        });

        expect(eventStartAddNew).toHaveBeenCalledWith({
            end: expect.anything(),
            start: expect.anything(),
            title: 'hola pruebas',
            notes: 'prueba'
        });

        expect(eventClearActiveNote).toHaveBeenCalled();
    });


    test('dates should be validated ', () => {

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title', value: 'hola pruebas'
            }
        });

        const hoy = new Date();

        act(() => {
            wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy) // .at(1) en referencia al segundo DateTimePicker, el de fin del evento
        });

        wrapper.find('form').simulate('submit', {
            preventDefault() { }
        });

        expect(Swal.fire).toHaveBeenCalledWith("Error", "End date should be later than start date", "error")
    });
})
