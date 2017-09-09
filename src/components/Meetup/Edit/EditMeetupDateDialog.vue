<template>
    <v-dialog v-model="dialog" width="350px" persistent v-tooltip:left="{ html: 'Edit Date' }">
        <v-btn flat small fab slot="activator">
            <v-icon>date_range</v-icon>
        </v-btn>
        <v-card>
            <form>
                <v-card-title>
                    <span class="headline">Edit Meetup Date</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-date-picker v-model="editedDate" style="width: 100%"></v-date-picker>
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
          editedDate: null,
          dialog: false
        }
      },
      methods: {
        onSaveChanges () {
          const newDate = new Date(this.meetup.date)
          const newDay = new Date(this.editedDate).getUTCDate()
          const newMonth = new Date(this.editedDate).getUTCMonth()
          const newYear = new Date(this.editedDate).getUTCFullYear()
          newDate.setUTCDate(newDay)
          newDate.setUTCMonth(newMonth)
          newDate.setUTCFullYear(newYear)
          this.$store.dispatch('updateMeetup', {id: this.meetup.id, date: newDate})
        }
      },
      created () {
        this.editedDate = new Date(this.meetup.date)
      }
    }
</script>