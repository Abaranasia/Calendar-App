import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { Navbar } from '../ui/Navbar';
import { messages } from '../../helpers/calendar-messages-es'; //textos de calendar en castellano
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es'; // fechas en castellano

moment.locale('es'); //Establecemos el idioma para las fechas

const localizer = momentLocalizer(moment) // or globalizeLocalizer

const events = [{
    title: 'Cumpleaños Ran',
    start: moment().toDate(),
    end: moment().add(2, 'hours').toDate(),
    //bgcolor: '#fafafa',
    notes: 'comprar pastel',
    user: {
        _id: 123,
        name: 'Ran Kirlian'
    }
}]


export const CalendarScreen = () => {

    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

    const onDoubleClick = (e) => {
        console.log(e)
    }

    const onSelect = (e) => {
        console.log(e)
    }

    const onViewChange = (e) => { // recoge el cambio de vista y lo guarda en localstorage para recordarlo
        setLastView(e);
        localStorage.setItem('lastView', e)
    }


    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: '#367AA7',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'white',
            display: 'block'
        }
        return { style }

    };

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
                view={lastView} //carga la vista que queramos, que será la última leida de localStorage
                components={{ // Evento que se envía 
                    event: CalendarEvent
                }}
            />

            <CalendarModal />
        </div>
    )
}
