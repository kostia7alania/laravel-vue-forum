<template>
                <div grey--text class="body-1">

                    <v-icon size=20>account_circle</v-icon>
                        {{ question.user }}
                        <v-icon size=20>date_range</v-icon>
                    {{ created_at }}

                    <v-tooltip v-if="updated_at" bottom class="pl-2">
                        <template v-slot:activator="{ on }">
                            <span v-on="on"><v-icon size=20>border_color</v-icon></span>
                        </template>
                        <span>Обновлен: {{ updated_at }}</span>
                    </v-tooltip>
                </div>
</template>

<script>
export default {
  name: "user-info",
  props: {
      question: Object
  },
  methods: {
      toHumanDateTime: date => {
          const d = new Date(date);
          if(d=='Invalid Date') return 'n/a';
        return `${d.getDate()}.${d.getMonth()+1}.${d.getFullYear()} ${d.getHours()>9?d.getHours():'0'+d.getHours()}:${d.getMinutes()>9?d.getMinutes():'0'+d.getMinutes()}`
      }
  },
  computed: {
    created_at() {
      //return new Date(this.question.created_at).toLocaleString();
      return this.toHumanDateTime(this.question.created_at);
    },
    updated_at() {
      if (!this.question || !this.question.updated_at) return false;
      const updated = new Date(this.question.updated_at);
      const created = new Date(this.question.created_at);
      if(+created == +updated) return false;
      //updated.toLocaleString();
      return this.toHumanDateTime(updated);
    }
  }
};
</script>
