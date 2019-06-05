<template>
    <div>
        <v-btn icon @click="likeIt">
            <v-icon :color="liked?'red':'red lighten-4'">favorite</v-icon> {{ count }}
        </v-btn>
    </div>
</template>



<script>
import { mapGetters } from 'vuex';


export default {
    props:['content'],
    data() {
        return {
            liked: this.content.liked,
            count: this.content.like_count
        }
    },
    created() {
        Echo.channel('likeChannel')
            .listen('LikeEvent', e => {
                console.log(e);
                if(this.content.id == e.id)
                    e.type==1 ? this.count++ : this.count--;
        })
    },
    computed: {
        ...mapGetters([ 'login/loggedIn'])
    },
    methods: {
        likeIt() {
            if(this['login/loggedIn']) {
                this.liked ? this.decr() : this.incr()
                this.liked = !this.liked
            } else snack('Для выполнения этого действия нужна авторизация!')
        },
        incr() {
            axios.post(`/like/${this.content.id}`)
            .then(res => this.count++)
            .catch(err => console.warn(err) )
        },
        decr() {
            axios.delete(`/like/${this.content.id}`)
            .then(res => this.count--)
            .catch(err => console.warn(err) )
        }
    }
}
</script>
