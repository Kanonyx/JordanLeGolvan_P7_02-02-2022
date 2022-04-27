<template>
  <v-app>

    <v-main>
      <Header />

      <router-view />

      <Footer />
    </v-main>

  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import Header from '@/components/HeaderVue.vue'
import Footer from '@/components/FooterVue.vue'

export default {
  name: 'App',

  data: () => ({
  }),
  components: {
    Header,
    Footer,
  },
  methods: {
    ...mapActions([
      'fetchAccessToken'
    ]),
  },
  created() {
    this.fetchAccessToken();
  }
};
</script>

<style scoped>
</style>
