import axios from 'axios';

const api = axios.create({

    baseURL: 'https://api-nattyapi.herokuapp.com'

});

export { api };