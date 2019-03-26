<template>
    <v-card>
        <v-toolbar color="cyan" dark dense>
            <v-toolbar-title>Categories
                <v-progress-circular v-if="loading" :size="20" :width="3" color="purple" indeterminate ></v-progress-circular>
            </v-toolbar-title>
        </v-toolbar>

        <div v-if="categories.length==0 && loading" class="text-xs-center">
            <v-progress-circular :size="70" :width="7" color="purple" indeterminate ></v-progress-circular>
        </div>

        <v-list v-else>
            <v-list-tile v-for="category in categories" :key="category.path">
                <v-list-tile-content>
                        <v-list-tile-title>
                           <router-link :to="category.path">{{ category.name}}</router-link>
                        </v-list-tile-title>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-card>
</template>

<script>

import {mapState, mapActions, mapGetters} from 'vuex'

export default {
    name: 'Categories',
    data(){
        return {
        }
    },
    created() {
        this['category/getCategories']();
    },
    computed: {
        ...mapGetters([
            'category/categories',
            'category/loading'
        ]),
        categories(){
            return this['category/categories']
        },
        loading(){
            return this['category/loading']
        },
    },
    methods: {
        ...mapActions([
            'category/getCategories'
        ])
    },

};
</script>
