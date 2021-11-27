import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActiveNote, eventSetActive, eventStartLoading } from '../../actions/events';


import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es'; //textos de calendar en castellano
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es'; // fechas en castellano
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';


moment.locale('es'); //Establecemos el idioma para las fechas
const localizer = momentLocalizer(moment) // or globalizeLocalizer


/* const events = [{
    title: 'Cumpleaños Ran',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    //bgcolor: '#fafafa',
    notes: 'comprar pastel',
    user: {
        _id: 123,
        name: 'Ran Kirlian'
    }
}] */


export const CalendarScreen = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector(state => state.calendar); // Trae del state todos los eventos del calendario
    const { uid } = useSelector(state => state.auth); // Trae del state el uid del usuario

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')


    useEffect(() => {
        dispatch(eventStartLoading()) // Carga todos los eventos de la BBDD de ese usuario
    }, [dispatch])

    const onDoubleClick = (e) => {
        //console.log(e)
        dispatch(uiOpenModal()); // Hacemos el dispatch de la acción openModal al uiReducer 
    }


    const onSelect = (e) => {
        //console.log(e)
        dispatch(eventSetActive(e)) // Hacemos el dispatch de la acción eventSetActive a calendarReducer estableciendo el evento como activo
    }


    const onViewChange = (e) => { // recoge el cambio de vista y lo guarda en localstorage para recordarlo
        setLastView(e);
        localStorage.setItem('lastView', e)
    }


    const eventStyleGetter = (event, start, end, isSelected) => {
        /**
         * Permite cambiar estéticamente los eventos de forma que
         * se muestren de un color u otro dependiendo de si son eventos del propio usuario u otro
         */

        const style = {
            backgroundColor: (uid === event.user._id) ? '#367AA7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white',
            display: 'block'
        }
        return { style }

    };

    const onSelectSlot = (e) => {
        dispatch(eventClearActiveNote()) //esto limpia ActiveEvent, lo que me permite esconder el botón de borrar al pulsar en cualquier sitio
    }

    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={messages} // Traducciones al es
                eventPropGetter={eventStyleGetter} // Envío de estilo de los eventos
                onDoubleClickEvent={onDoubleClick} // handle de los eventos que emite el calendario
                onSelectEvent={onSelect} // handle de los eventos que emite el calendario
                onView={onViewChange}
                onSelectSlot={onSelectSlot}
                selectable={true}
                view={lastView} //carga la vista que queramos, que será la última leida de localStorage
                components={{ // Evento que se envía 
                    event: CalendarEvent
                }}
            />

            <AddNewFab />

            {!!activeEvent && <DeleteEventFab />}

            <CalendarModal />
        </div>
    )
}
