<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right"><v-btn large :to="{name: 'Meetups'}" class="primary">Explore Meetups</v-btn></v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left"><v-btn :to="{name: 'CreateMeetup'}" class="primary" large>Organize Meetup</v-btn></v-flex>
    </v-layout>

    <v-layout row v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"></v-progress-circular>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-2" v-if="!loading">
      <v-flex>
        <v-carousel style="cursor: pointer">
          <v-carousel-item
                  v-for="(item, i) in meetups"
                  v-bind:src="item.imageUrl"
                  :key="i"
                  @click="onLoadMeetup(item.id)"
          >
            <div class="title">{{ item.title }}</div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <p>Join Our Awesome Meetups</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  computed: {
    meetups () {
      return this.$store.getters.featureMeetups
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  data () {
    return {}
  },
  methods: {
    onLoadMeetup (id) {
      this.$router.push('/meetups/' + id)
    }
  }
}
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    color: whitesmoke;
    text-align: center;
    font-size: 2em;
    padding: 10px;
  }
</style>
