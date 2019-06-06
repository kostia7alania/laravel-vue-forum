<template>
    <div clsas="text-xs-center">
        <v-menu offset-y>

            <template v-slot:activator="{ on }">
                <v-btn icon slot="activator" v-on="on">
                    <v-icon :color="unreadCount?'red':'red lighten-4'">add_alert</v-icon>
                    {{ unreadCount }}
                </v-btn>
            </template>

            <v-list :class="noAlerts?'ma-0 pa-0':'pb-0'" >
                <v-list-item v-for="item in unread" :key="item.id">
                    <router-link :to="item.path">
                        <v-list-item-title @click="markAsRead(item)">{{ item.question }}</v-list-item-title>
                    </router-link>
                </v-list-item>

                <v-divider v-if="unreadCount"/>

                <v-list-item v-for="item in read" :key="item.id">
                    <router-link :to="item.path">
                        <v-list-item-title>{{ item.question }}</v-list-item-title>
                    </router-link>
                </v-list-item>

                <v-alert  class=" mb-0" v-if="!noAlerts && noNews" :value="true" color="primary" > Нету новостей </v-alert>
                <v-alert  class=" mb-0" v-if="noAlerts" type="info" > Нету оповещений </v-alert>

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
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "notifics",
  data() {
    return {
      inited: false,
      sound:
        "https://www.soundsnap.com/streamers/play.php?id=1554465771.2719:f58b2a1ec50f5a5b79ed74d836d2eaf5a2bb11bf:f25ca3cbbbabc600c18619f588ee0dcca822172413031b9a056fd1630e73ba2c2679ee348c5b56583ca59d4991f14127b8864d3e2470b3f99886768a7d15eec51084495434374d0349db5c4692805249960df3d70666eaeaa184aafadbd04757a4817a0bbe20252aad7a46d82f7af97614d23353e3632e798535b8ccf6e381d8eb2f51bed6cda2c33c7d111a8750e4a031ec38acbd4b8c99a0fb212930aa07b40458547b8fb80d1e020fa595b7fd75bb8f93a0aa1b0a23d595344668f7084bc65d5c3d2941a2afc7e3ed0c18f9bc1cd606a9b8934f8be11fbbf5e42b7c3313d7" // @/assets/alert_audio.mp3'
    };
  },
  created() {
    this.getNotifications();
    this.initLiveNotifications();
  },
  computed: {
    ...mapGetters([
      "login/loggedIn",
      "login/id",
      "notification/read",
      "notification/unread"
    ]),
    loggedIn() {
      return this["login/loggedIn"];
    },
    noAlerts() {
      return !this.unreadCount && !this.readCount;
    },
    noNews(){
      return !this.unreadCount
    },
    read() {
      return this["notification/read"];
    },
    unread() {
      return this["notification/unread"];
    },
    readCount() {
      const u = this.read;
      return u && u instanceof Array && u.length;
    },
    unreadCount() {
      const u = this.unread;
      return u && u instanceof Array && u.length;
    }
  },
  watch: {
    loggedIn(neww, old) {
      alert("");
      this.getNotifications();
      this.initLiveNotifications();
    }
  },
  methods: {
    ...mapActions(["notification/getNotifications", "notification/markAsRead"]),
    async getNotifications() {
      if (this["login/loggedIn"]) {
        let bool = await this["notification/getNotifications"]();
        if (bool) console.log("GET NOTIF: success");
        else console.warn("GET NOTIF: failed");
      }
    },
    initLiveNotifications() {
      if (this["login/loggedIn"] && !this.inited) {
        window.playSound = this.playSound; // <- 4-test
        Echo.private("App.User." + this["login/id"]).notification(
          notification => {
            console.log("app notif.vue ->", notification, notification.type);
            this.playSound();
            this.getNotifications();
            this.inited = true;
          }
        );
      }
    },
    playSound() {
      let alert = new Audio(this.sound);
      alert.play();
    },
    markAsRead(notification) {
      this["notification/markAsRead"](notification);
    }
  }
};
</script>

<style>
.mt-0 {
  margin-top: 0px !important;
}
</style>
