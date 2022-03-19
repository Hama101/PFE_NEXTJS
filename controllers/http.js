// import axios and create a default instance of axios
import axios from 'axios';
//API routes
import DATABASEURL from './apiRoutes'

// to cancel requests when spaming the server

export const callDjango = axios.create({
    baseURL: DATABASEURL.production,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const callNext = axios.create({
    baseURL: '/api',
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
    }
});
