
import User from './Helpers/User';
import AppStorage from './Helpers/AppStorage';
const login = require('./Modules/login.js');
export default {

    login,
    getUser({commit}) {
        axios
            .get('/Admin/FetchUser')
            .then(res=> commit('changeProp',{ prop: 'user', val: res.data }) )
            .catch(err=>console.warn(err))
    },

    emailAvailable({}, email) {
        return axios
                .get(`AnonAccessUser/EmailAvailable?email=${email}`)
                .then(res=>res.data)
                .catch(()=>null)
    },

    //CfDJ8L57RTuEqqRNthB8AJJgJ_dzHir0N-o-krrWnjhCHlWMow9SbJGz8pzi7QsT0OF4wpetYAwMEJ8dcWWcOFkpHZ6l84hO4GR-2oOADRNZk05aivzWNwALKTQps4vG11LZMD5OsNWs3CCKdHbjL3cB4fU
    checkInvite({},invite) {
        console.log('invite',invite)
        return axios.get(`/AnonAccessUser/ParentIDFromInvitationLink?invitationLink=${invite}`)
                    .then(res=>res.data).catch(()=>false)
    },


    uploadImage({},{IFormFile,id}){
        let formData = new FormData()
        formData.append('IFormFile', IFormFile)
        return axios
                .put('/AnonAccessUser/UploadImage',formData)
                .then(res=>{console.log(res);return res.data})
                .catch(err=>{console.warn(err);return false})
    },



}
