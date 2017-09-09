<template>
    <v-container>
        <v-layout row v-if="loading">
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular
                        indeterminate
                        class="primary--text"
                        :width="7"
                        :size="70"></v-progress-circular>
            </v-flex>
        </v-layout>

        <v-layout row wrap v-else>
            <v-flex xs12>
                <v-card>
                    <v-card-title>
                        <div class="headline primary--text">{{ meetup.title }}</div>
                        <template v-if="isCreator">
                            <v-spacer></v-spacer>
                            <app-edit-meetup-details-dialog :meetup="meetup"></app-edit-meetup-details-dialog>
                        </template>
                    </v-card-title>
                    <v-card-media
                            :src="meetup.imageUrl"
                            height="400"
                    ></v-card-media>
                    <v-card-text>
                        <div class="secondary--text">
                            {{ meetup.date | date }} &mdash; {{ meetup.location }}
                            <app-edit-meetup-date-dialog :meetup="meetup" v-if="isCreator"></app-edit-meetup-date-dialog>
                            <app-edit-meetup-time-dialog :meetup="meetup" v-if="isCreator"></app-edit-meetup-time-dialog>
                        </div>
                        <div>{{ meetup.description }}</div>
                    </v-card-text>
                    <v-card-actions class="white">
                        <v-spacer></v-spacer>
                        <app-meetup-register-dialog :meetupId="meetup.id" v-if="userIsAuthenticated && !isCreator"></app-meetup-register-dialog>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      meetup () {
        return this.$store.getters.loadedMeetup(this.id)
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      isCreator () {
        if (!this.userIsAuthenticated) {
          return false
        }
        return this.$store.getters.user.id === this.meetup.creatorId
      },
      loading () {
        return this.$store.getters.loading
      }
    }
  }
</script>
