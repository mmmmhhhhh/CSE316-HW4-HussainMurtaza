/*
    This is our http api for all things auth, which we use to 
    send authorization requests to our back-end API. Now using
    the native Fetch API instead of Axios.
    
    @author McKilla Gorilla
*/

const BASE_URL = 'http://localhost:4000/auth';

async function fetchWithCredentials(endpoint, method = 'GET', data = null) {
    const config = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include', // same as axios.defaults.withCredentials = true
    };

    if (data) {
        config.body = JSON.stringify(data);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const json = await response.json();

    if (!response.ok) {
        throw new Error(json.errorMessage || 'Request failed');
    }

    return json;
}

// Exported functions — same signatures as before:
export const getLoggedIn = () => fetchWithCredentials('/loggedIn');

export const loginUser = (email, password) => {
    return fetchWithCredentials('/login', 'POST', { email, password });
};

export const logoutUser = () => fetchWithCredentials('/logout');

export const registerUser = (firstName, lastName, email, password, passwordVerify) => {
    return fetchWithCredentials('/register', 'POST', {
        firstName,
        lastName,
        email,
        password,
        passwordVerify,
    });
};

const apis = {
    getLoggedIn,
    registerUser,
    loginUser,
    logoutUser,
};

export default apis;