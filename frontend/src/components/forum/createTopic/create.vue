<template>
   <v-container>

       <v-form @submit.prevent="create"  data-app>
           <span class="red--text" v-if="errors.title">{{ errors.title[0] }}</span>
           <v-text-field
            label="Title"
            v-model="form.title"
            type="text"
            required
           ></v-text-field>


            <span class="red--text" v-if="errors.body">{{ errors.body[0] }}</span>
            <markdown :form="form"></markdown>

            <v-btn
                color="green"
                type="submit"
                :disabled="disabled"
            > Create </v-btn>


           <span class="red--text" v-if="errors.category_id">{{ errors.category_id[0] }}</span>
            <categories :form='form'/>
       </v-form>
   </v-container>
</template>
<script>

import {mapActions} from 'vuex'
import categories from './categories'
import markdown from '@/components/markdown'

export default {
    components: {
        categories,
        markdown
    },
    data(){
        return {
            form: {
                title:null,
                category_id:null,
                body:null
            },
            errors: {}
        }
    },
    computed: {
        disabled() {
            return !(this.form.title  &&
                     this.form.body   &&
                     this.form.category_id);
        }
    },
    methods: {
        ...mapActions([
            'login/logout'
        ]),
        create() {
            axios.post('/question', this.form)
            .then(res => this.$router.push(res.data.path))
            .catch(error => {
                console.log('ERRR=>', error)
                if(error.error.match('Token is')) {
                    this['login/logout']();
                } else {
                    this.errors = error.response.data.errors
                }
            })
        }
    }
}
</script>

