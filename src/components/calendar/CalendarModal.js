import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root'); // id del elemento raiz de index.html

const now = moment().minutes(0).seconds(0).add(1, 'hours'); // Esto establece el momento inicial no ahora si no a la próxima hora punta posible
const later = now.clone().add(1, 'hours'); //función de moment que clona otro momento



export const CalendarModal = () => {

    const [dateStart, setDateStart] = useState(now.toDate()); // Fecha de inicio
    const [dateEnd, setDateEnd] = useState(later.toDate()); // Fecha de fin
    const [titleValid, setTitleValid] = useState(true);

    const [formValues, setFormValues] = useState({ // Objecto principal
        title: 'Evento',
        notes: 'prueba',
        start: now.toDate(),
        end: later.toDate()
    });

    const { notes, title, start, end } = formValues;


    const handleInputChange = ({ target }) => { // Tomamos los datos de entrada title y note
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }


    const handleStartDateChange = (e) => { // Establecemos la fecha de inicio
        setDateStart(e);
        setFormValues({
            ...formValues,
            start: e
        })
    }


    const handleEndDateChange = (e) => { // Establecemos la fecha de fin
        setDateEnd(e);
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmitForm = (e) => { // Tomamos los datos de envío del form
        e.preventDefault();

        const momentStart = moment(start);
        const momentEnd = moment(end);

        if (momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire('Error', 'End date should be later than start date', 'error')

        }

        if (title.trim().length < 2) {
            return setTitleValid(false);
        }

        setTitleValid(true);
        closeModal()
    }


    const closeModal = () => {

    }

    return (
        <Modal
            isOpen={true}
            onRequestClose={closeModal}
            style={customStyles} // Estilos personalizados
            className="modal" //Clase principal
            overlayClassName="modal-fondo" //Estilo de fondo personalizado
            closeTimeoutMS={200} // Animación de cierre
        >
            <h2> Nuevo evento </h2>
            <hr />

            <form
                className="container"
                onSubmit={handleSubmitForm}>

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                        onChange={handleStartDateChange}
                        value={dateStart}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                        onChange={handleEndDateChange}
                        value={dateEnd}
                        minDate={dateStart} //la fecha de fin no debe ser anterior a la de inicio
                        className="form-control"
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
