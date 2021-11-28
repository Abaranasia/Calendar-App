import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';

import { AppRouter } from '../../routers/AppRouter';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

//store.dispatch = jest.fn();


describe('AppRouter tests', () => {

    test('should display "Loading...', () => {

        const initState = {
            auth: {
                checking: true
            }
        };

        const store = mockStore(initState);

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h5').exists()).toBeTruthy();
    });




    test('should display the public route', () => {

        const initState = {
            auth: {
                checking: false,
                uid: null
            }
        };

        const store = mockStore(initState);

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.login-container').exists()).toBeTruthy();
    });


    test('should display the private route', () => {

        const initState = {
            auth: {
                checking: false,
                uid: '123',
                name: 'testingUser'
            },
            calendar: {
                events: []
            },
            ui: {
                modalOpen: false
            }
        };

        const store = mockStore(initState);

        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.calendar-screen').exists()).toBeTruthy();
    });
})
