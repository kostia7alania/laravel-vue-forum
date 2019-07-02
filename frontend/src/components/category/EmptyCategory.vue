<template>
    <v-alert
      v-model="alert"
      dismissible
      color="cyan"
      border="left"
      elevation="2"
      colored-border
      icon="mdi-twitter"
    >
      В данном разделе нет созданных тем.
       <span v-if="isAdmin">
        Вы можете <a href="#" @click="$router.push({name:'ask'})">создать</a> первую тему!
       </span>

    </v-alert>
</template>

<script>
export default {
  name: "empty-category",
  computed: {
    alert: {
      get() {
        return true;
      },
      set() {
        this.$router.push({ name: "forum" });
      }
    },
    isAdmin() {
      return this.$store.getters["login/isAdmin"];
    }
  }
};
</script>
