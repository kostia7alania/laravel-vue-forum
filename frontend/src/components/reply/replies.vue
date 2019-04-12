<template>
    <div>

        <div v-if="loading" class="text-xs-center">
            <v-progress-circular :size="70" :width="7" color="purple" indeterminate ></v-progress-circular>
        </div>

        <reply v-else
            v-for="(reply,index) in content"
            :key="reply.id"
            :data="reply"
            :index="index"
        />
    </div>
</template>

<script>
import reply from "./reply";
import { mapGetters } from 'vuex';
export default {
  name: "REPLIES",
  props: ["slug"],
  components: { reply },
  data(){
      return {
          loading:false,
          content: null
      }
  },
  created () {
      this.getReplies()
      this.listen()
  },
  computed: {
      ...mapGetters([
          'login/id'
      ])
  },
  methods: {

    getReplies() {
        this.loading = true;
      axios
        .get(`/question/${this.slug}/reply`)
        .then(res => {
            this.content = res.data.data
        })
        .finally( () => this.loading = false)
    },


      listen() {
          EventBus.$on('newReply', reply => {
              this.content.unshift(reply);
              window.scrollTo(0,0)
          })
          EventBus.$on('deleteReply', index => {
              axios
                .delete(`/question/${this.question.slug}/reply/${this.content[index].id}`)
                .then(res => {
                    this.content.splice(index,1);
                })
                .catch( err => console.warn(err))
          })

            Echo.private('App.User.' + this['login/id'])
            .notification(notification => {
                console.log('NOTIF->',notification, notification.type)
                this.content.unshift(notification.reply)
            })

            Echo.channel('deleteReplyChannel')
            .listen('DeleteReplyEvent', e => {
                console.log('DeleteReplyEvent=>', e);
                for(let index = 0; index < this.content.length; index++) {
                    if(this.content[index].id == e.id) {
                        this.content.splice(index, 1);
                    }
                }
            })
      }
  }


};
</script>
