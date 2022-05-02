<template>
  <v-app>


    <v-main id="vmain">
      <Header />
      <v-container class="my-8">
        <router-view />
      </v-container>
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
#vmain {
  background: url("./assets/19366.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
