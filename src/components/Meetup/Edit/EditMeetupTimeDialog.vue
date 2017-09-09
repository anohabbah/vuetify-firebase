<template>
    <v-dialog v-model="dialog" width="350px" persistent v-tooltip:left="{ html: 'Edit Time' }">
        <v-btn small flat fab slot="activator">
            <v-icon>update</v-icon>
        </v-btn>
        <v-card>
            <form>
                <v-card-title>
                    <span class="headline">Edit Meetup Time</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-time-picker v-model="editedTime" style="width: 100%" format="24hr"></v-time-picker>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="blue--text darken-1" flat @click.native="dialog = false">Close</v-btn>
                    <v-btn class="blue--text darken-1" flat @click.native="onSaveChanges">Save</v-btn>
                </v-card-actions>
            </form>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
      props: ['meetup'],
      data () {
        return {
          editedTime: null,
          dialog: false
        }
      },
      methods: {
        onSaveChanges () {
          const newDate = new Date(this.meetup.date)
          const hours = this.editedTime.match(/^(\d+)/)[1]
          const minutes = this.editedTime.match(/:(\d+)/)[1]
          newDate.setHours(hours)
          newDate.setMinutes(minutes)
          this.$store.dispatch('updateMeetup', {id: this.meetup.id, date: newDate})
        }
      },
      created () {
        this.editedTime = new Date(this.meetup.date).toTimeString()
      }
    }
</script>