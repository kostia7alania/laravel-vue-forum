<template>
    <div clsas="text-xs-center">
        <v-menu offset-y>
            <v-btn icon slot="activator">
                <v-icon :color="unreadCount?'red':'red lighten-4'">add_alert</v-icon>
                {{ unreadCount }}
            </v-btn>
            <v-list>

                <v-list-tile v-for="item in unread" :key="item.id">
                    <router-link :to="item.path">
                        <v-list-tile-title @click="readIt(item)">{{ item.question }}</v-list-tile-title>
                    </router-link>
                </v-list-tile>
                <v-divider/>

                <v-list-tile v-for="item in read" :key="item.id">
                    <router-link :to="item.path">
                        <v-list-tile-title>{{ item.question }}</v-list-tile-title>
                    </router-link>
                </v-list-tile>

            </v-list>
        </v-menu>
       <!--
           <audio controls="controls">
                Ваш браузер не поддерживает <code>audio</code> элемент.
                <source :src="sound" autoplay type="audio/mp3">
            </audio>
        -->
    </div>
</template>

<script>
export default {
  data() {
    return {
      read: {},
      unread: {},
      unreadCount: 0,
      sound: 'https://www.soundsnap.com/streamers/play.php?id=1554465771.2719:f58b2a1ec50f5a5b79ed74d836d2eaf5a2bb11bf:f25ca3cbbbabc600c18619f588ee0dcca822172413031b9a056fd1630e73ba2c2679ee348c5b56583ca59d4991f14127b8864d3e2470b3f99886768a7d15eec51084495434374d0349db5c4692805249960df3d70666eaeaa184aafadbd04757a4817a0bbe20252aad7a46d82f7af97614d23353e3632e798535b8ccf6e381d8eb2f51bed6cda2c33c7d111a8750e4a031ec38acbd4b8c99a0fb212930aa07b40458547b8fb80d1e020fa595b7fd75bb8f93a0aa1b0a23d595344668f7084bc65d5c3d2941a2afc7e3ed0c18f9bc1cd606a9b8934f8be11fbbf5e42b7c3313d7' // @/assets/alert_audio.mp3'
    };
  },
  created() {
    window.playSound = this.playSound// <- 4-test
    if (User.loggedIn()) {
      this.getNotifications();
    }
    Echo.private("App.User." + User.id())
        .notification(notification => {
      console.log("app notif.vue ->", notification, notification.type);
        this.playSound()
        this.unread.unshift(notification)
        this.unreadCount++
    });
  },
  methods: {
    playSound() {
        let alert = new Audio(this.sound)
        alert.play()
    },
    getNotifications() {
      axios.post("/api/notifications").then(res => {
        this.read = res.data.read;
        this.unread = res.data.unread;
        this.unreadCount = res.data.unread.length;
      })
      .catch(err=>Exception.handle(err))
    },
    readIt(notification) {
      axios
        .post("/api/markAsRead", { id: notification.id })
        .then(res => {
          this.unread.splice(notification, 1);
          this.read.push(notification);
          this.unreadCount--;
        })
        .catch(err => { console.warn(err); });
    }
  }
};
</script>

