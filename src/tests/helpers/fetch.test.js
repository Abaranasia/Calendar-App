import { fetchSinToken, fetchConToken } from "../../helpers/fetch"


describe('fetch helpers tests', () => {

    let token = '';

    const user = {
        "email": "josanrod442@gmail.com",
        "password": "1234567"
    }

    test('fetchSinToken tests', async () => {

        const resp = await fetchSinToken('auth', user, 'POST'); // Nuestro helper sin token
        const body = await resp.json();
        // console.log(body)


        expect(resp instanceof Response).toBeTruthy();
        expect(body.ok).toBe(true);
        expect(body.token).not.toBeNull(); // aprovecharemos para tomar el token para el próximo test

        token = body.token; // para probar fetchConToken
    });


    test('fetchConToken test without token ', async () => {
        // Probamos borrar un evento sin token de usuario

        localStorage.setItem('token', '');

        const resp = await fetchConToken('events/61a21d55e498b1115440c013', {}, 'DELETE');
        const body = await resp.json();

        expect(body.msg).toBe('No hay token en la petición')
    });


    test('fetchConToken test with invalid user ', async () => {
        // Probamos borrar un evento de un usuario distinto

        localStorage.setItem('token', token);

        const resp = await fetchConToken('events/61a21d55e498b1115440c013', {}, 'DELETE');
        const body = await resp.json();

        expect(body.msg).toBe('El usuario actual no tiene permiso para borrar este evento')
    });
})
