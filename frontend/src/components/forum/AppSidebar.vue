<template>
    <v-card>
        <v-toolbar color="cyan" dark dense class="mt-2">
            <v-toolbar-title>Categories</v-toolbar-title>
        </v-toolbar>

        <div v-if="loading" class="text-xs-center">
            <v-progress-circular :size="70" :width="7" color="purple" indeterminate ></v-progress-circular>
        </div>

        <v-list v-else>
            <v-list-tile v-for="category in categories" :key="category.name">
                <v-list-tile-content>
                    <v-list-tile-title>{{ category.name}}</v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-card>
</template>

<script>
export default {
    name: 'sidebar',
    data(){
        return {
            loading: false,
            categories: []
        }
    },
    created() {
        this.loading = true;
        axios.get('/api/category')
        .then(res => this.categories = res.data.data)
        .finally(e=>this.loading = false)
    }
};
</script>
