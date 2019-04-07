<template>
                <!--
                <div v-if="loading" class="text-xs-center">
                    <v-progress-circular :size="70" :width="7" color="purple" indeterminate ></v-progress-circular>
                </div>-->


            <v-autocomplete
                :items="categories"
                item-text="name"
                item-value="id"

                cache-items
                :loading="loading"
                v-model="form.category_id"
                label="Category"

                  style="z-index:22222;"
                hint="Type the first letters and select the appropriate category"
            ></v-autocomplete>
</template>
<script>
export default {
    props: ['form'],
    data(){
        return {
            loading:false,
            categories: [],
            errors: {}
        }
    },
    created() {
        this.loading = true;
        axios
            .get('/category')
            .then(res => this.categories = res.data.data)
            .finally(()=>this.loading=false)
    },
}
</script>

