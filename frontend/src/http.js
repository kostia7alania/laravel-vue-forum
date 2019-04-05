const JwtToken = `Bearer ${localStorage.getItem('token')}`;
const ax = require('axios');
window.axios = ax.create({
    baseURL: 'http://localhost:80',
    headers: {
        common: {
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': JwtToken
        }
    }
  });
/*
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.headers.common['Authorization'] = JwtToken;
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
            Authorization: JwtToken
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
