
const baseUrl = process.env.REACT_APP_API_URL;


/** Helper para comunicarnos con el backend
 * 
 * @param {*} endpoint --> punto de conexión en el backend
 * @param {*} data --> Data a enviar
 * @param {*} method --> método de envío de los datos al endpoint
 * @returns 
 */

const fetchSinToken = (endpoint, data, method = 'GET') => {
    // Este fetch será capaz de comunicarse con el backend sin necesidad de token

    const url = `${baseUrl}/${endpoint}`; // Por ejemplo: localhost:4000/api/event

    if (method === 'GET') {
        return fetch(url)
    } else {
        return fetch(url, {
            method, //el tipo de método <> GET: POST, PUT o DELETE
            headers: {
                'Content-type': 'application/json' //siempre enviamos json
            },
            body: JSON.stringify(data)
        })
    }
}

const fetchConToken = (endpoint, data, method = 'GET') => {
    // Este fetch será capaz de comunicarse con el backend empleando el token

    const url = `${baseUrl}/${endpoint}`; // Por ejemplo: localhost:4000/api/event
    const token = localStorage.getItem('token') || ''; // para evitar que sea null

    if (method === 'GET') {
        return fetch(url, {
            method,
            headers: {
                'x-token': token
            }
        })
    } else {
        return fetch(url, {
            method, //el tipo de método <> GET: POST, PUT o DELETE
            headers: {
                'Content-type': 'application/json', //siempre enviamos json
                'x-token': token
            },
            body: JSON.stringify(data)
        })
    }
}

export {
    fetchSinToken,
    fetchConToken
}