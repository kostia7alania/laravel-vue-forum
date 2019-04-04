window.axios = require('axios');
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
const JwtToken = `Bearer ${localStorage.getItem('token')}`;
window.axios.defaults.headers.common['Authorization'] = JwtToken;