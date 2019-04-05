<template>
    <v-card>
        <v-toolbar color="cyan" dark dense class="mt-2">
            <v-toolbar-title>Categories</v-toolbar-title>
        </v-toolbar>

        <v-list>
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
            categories: []
        }
    },
    created() {
        axios.get('/api/category')
        .then(res => this.categories = res.data.data)
    }
};
</script>
