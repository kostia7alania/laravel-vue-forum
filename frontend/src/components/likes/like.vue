<template>
    <div>
        <v-btn icon @click="likeIt">
            <v-icon :color="liked?'red':'red lighten-4'">favorite</v-icon> {{ count }}
        </v-btn>
    </div>
</template>



<script>
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
    methods: {
        likeIt() {
            if(User.loggedIn()) {
                this.liked ? this.decr() : this.incr()
                this.liked = !this.liked
            }
        },
        incr() {
            axios.post(`/api/like/${this.content.id}`)
            .then(res => this.count++)
            .catch(err => console.warn(err) )
        },
        decr() {
            axios.delete(`/api/like/${this.content.id}`)
            .then(res => this.count--)
            .catch(err => console.warn(err) )
        }
    }
}
</script>
