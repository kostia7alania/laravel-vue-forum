<template>
    <v-card>
        <v-toolbar color="cyan" dark dense>
            <v-toolbar-title>Категории ({{ categories_length }})
                <v-progress-circular v-if="loading" :size="20" :width="3" color="purple" indeterminate ></v-progress-circular>
            </v-toolbar-title>
        </v-toolbar>

        <div v-if="categories.length==0 && loading" class="text-xs-center">
            <v-progress-circular :size="70" :width="7" color="purple" indeterminate ></v-progress-circular>
        </div>

        <v-list v-else>
            <v-list-item v-for="category in categories" :key="category.path">
                <v-list-item-content>
                        <v-list-item-title>
                            <router-link :to="category.path">[{{ category.questions_count }}] {{ category.name }}
                                </router-link>
                        </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'

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
        loading(){
            return this['category/loading']
        },
        categories(){
            return this['category/categories']
        },
        categories_length(){
            return this.categories.length || 0;
        }
    },
    methods: {
        ...mapActions([
            'category/getCategories'
        ])
    },

};
</script>
