<template>
    <div>
        <reply
            v-for="(reply,index) in content"
            :key="reply.id"
            :data="reply"
            :index="index"
        />
    </div>
</template>

<script>
import reply from "./reply";
export default {
  name: "REPLIES",
  props: ["question"],
  components: { reply },
  data(){
      return {
          content: this.question.replies
      }
  },
  created () {
      this.listen()
  },
  methods: {
      listen() {
          EventBus.$on('newReply', reply => {
              this.body = ''
              this.content.unshift(reply);
              window.scrollTo(0,0)
          })
          EventBus.$on('deleteReply', index => {
              axios
                .delete(`/api/question/${this.question.slug}/reply/${this.content[index].id}`)
                .then(res => {
                    this.content.splice(index,1);
                })
                .catch( err => console.warn(err))
          })

            Echo.private('App.User.' + User.id())
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
