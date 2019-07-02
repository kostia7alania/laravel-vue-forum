///const tok = localStorage.getItem('token');
const ax = require('axios');
window.axios = ax.create({
    baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://127.0.0.1:8000/api',// 'http://127.0.0.1:8000/api', ///'http://localhost:80/api',
    headers: {
        /*common: {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': `Bearer ${store.state.login.token}`
        }*/
    }
});
/*
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.login.token}`
*/
//ПОСЛЕ ОТПРАВКИ КАЖДОГО ЗАПРОСА
axios.interceptors.request.use(config => {
    //  config.validateStatus = status => status < 500; // Reject only if the status code is greater than or equal to 500

    const token = store.state.login.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    else 'Authorization' in config.headers ? delete config.headers.Authorization : '';
    return config;
},
    error => Promise.reject(error)
);


//ПОСЛЕ ПОЛУЧЕНИЯ КАЖДОГО ОТВЕТА
axios.interceptors.response.use(res => {
    // после каждого получения ответа
    if (process.env.NODE_ENV !== 'production')
        console.log('[RES]=>', res)
    store._actions['login/checkPermitionsOnCurrentPath'][0]()//check perm and redirect
    if (res.status == 401) {
        snack('Недостаточно прав для этого действия', 'error')
    }

    return res
})








import Echo from 'laravel-echo'
window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: "7b08572e181a32553e9a",
    cluster: "eu",
    encrypted: true,
    auth: {
        headers: { Authorization: store.state.login.token }
    }
});



/* химичу */
Pusher.logToConsole = true;
/*
var pusher = new Pusher('7b08572e181a32553e9a', {
  cluster: 'eu',
  forceTLS: true
});
*/


