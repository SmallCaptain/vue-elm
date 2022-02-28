import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://localhost:5115',
});
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.Authorization = 'Bearer ' + sessionStorage.getItem('Token') || 'null';
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

export default instance;