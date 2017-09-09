<template>
        <v-dialog v-model="dialog" lazy absolute>
            <v-btn primary dark slot="activator">{{ userIsRegistered ? 'Unregister' : 'Register' }}</v-btn>
            <v-card>
                <v-card-title v-if="userIsRegistered">
                    <div class="headline">Unregister from Meetup?</div>
                </v-card-title>
                <v-card-title v-else>
                    <div class="headline">Register for Meetup?</div>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>You can always change you decision later on.</v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="red--text darken-1" flat="flat" @click.native="dialog = false">Cancel</v-btn>
                    <v-btn class="green--text darken-1" flat="flat" @click.native="onAgree">Confirm</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
</template>

<script>
    import VDivider from '../../../../node_modules/vuetify/src/components/VDivider/VDivider.vue'

    export default {
      components: {VDivider},
      props: ['meetupId'],
      data () {
        return {
          dialog: false
        }
      },
      computed: {
        userIsRegistered () {
          return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
            return this.meetupId === meetupId
          }) >= 0
        }
      },
      methods: {
        onAgree () {
          if (this.userIsRegistered) {
            this.$store.dispatch('unregisterUserFromMeetup', this.meetupId)
          } else {
            this.$store.dispatch('registerUserForMeetup', this.meetupId)
          }
        }
      }
    }
</script>
