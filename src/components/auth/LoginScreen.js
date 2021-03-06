import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

import './login.css';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    //const [formValues, handleInputChange, reset] = useForm(initialForm);
    const [formLoginValues, handleLoginInputChange] = useForm({
        loginEmail: 'hhansolo@gmail.com',
        loginPassword: '1234567'
    });
    const { loginEmail, loginPassword } = formLoginValues; // Toma de valores del form para Login


    const [formRegisterValues, handleRegisterInputChange] = useForm({
        registerName: 'Pepo',
        registerEmail: 'pepo@gmail.com',
        registerPassword1: '1234567',
        registerPassword2: '1234567',
    });
    const { registerName, registerEmail, registerPassword1, registerPassword2 } = formRegisterValues; // Toma de valores del form para Registor


    const handleLogin = (e) => {
        e.preventDefault();
        //console.log(formLoginValues)
        dispatch(startLogin(loginEmail, loginPassword));
    }

    const handleRegister = (e) => {
        e.preventDefault();

        if (registerPassword1 !== registerPassword2) {
            return Swal.fire('Error', 'Las contraseñas deben ser iguales', 'error')
        }
        dispatch(startRegister(registerName, registerEmail, registerPassword1));
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="registerName"
                                value={registerName}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="registerPassword1"
                                value={registerPassword1}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="registerPassword2"
                                value={registerPassword2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
