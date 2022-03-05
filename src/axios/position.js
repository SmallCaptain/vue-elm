import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://elm.cangdu.org',
});


export default instance;