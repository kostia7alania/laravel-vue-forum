///const tok = localStorage.getItem('token');
const ax = require('axios');
window.axios = ax.create({
    baseURL: 'http://127.0.0.1:8000/api',///'http://localhost:80/api',
    headers: {
        common: {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': `Bearer ${store.state.login.token}`
        }
    }
  });
/*
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
window.axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.login.token}`
*/



import Echo from 'laravel-echo'
window.Pusher = require('pusher-js');

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: "7b08572e181a32553e9a",
    cluster: "eu",
    encrypted: true,
    auth: {
        headers: {
            Authorization: store.state.login.token
        }
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