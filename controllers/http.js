// import axios and create a default instance of axios
import axios from 'axios';
//API routes
import DATABASEURL, { BASE_AI_LIVE_URL } from './apiRoutes'

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

export const callAI = axios.create({
    baseURL: BASE_AI_LIVE_URL,
    timeout: 60000, // this may take a long time
    headers: {
        Aceept: 'application/json',
        'Content-Type': 'multipart/form-data'
    }
})
