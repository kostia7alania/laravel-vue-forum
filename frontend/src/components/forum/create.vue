<template>
   <v-container>
       <v-form @submit.prevent="create"  data-app>

           <v-text-field
            label="Title"
            v-model="form.title"
            type="text"
            required
           ></v-text-field>

            <v-autocomplete
                :items="categories"
                item-text="name"
                item-value="id"
                v-model="form.category_id"
                label="Category"
                hint="Type the first letters and select the appropriate category"
            ></v-autocomplete>

            <markdown-editor v-model="form.body" ref="markdownEditor"></markdown-editor>

            <v-btn
                color="green"
                type="submit"
            > Create </v-btn>

       </v-form>
   </v-container>
</template>
<script>
export default {
    data(){
        return {
            form: {
                title:null,
                category_id:null,
                body:null
            },
            categories: [],
            errors: {}
        }
    },
    created(){
        axios.get('/api/category')
        .then(res => this.categories = res.data.data)
    },
    methods: {
        create() {
            axios.post('/api/question', this.form)
            .then(res => this.$router.push(res.data.path))
            .catch(err => {
                console.log('ERRR=>',err)
                this.errors = err.error
            })
        }
    }
}
</script>

