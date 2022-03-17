// import axios and create a default instance of axios
import axios from 'axios';
//API routes
import DATABASEURL from './apiRoutes'

export const callDjango = axios.create({
    baseURL: DATABASEURL.production,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const callNext = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }
});
