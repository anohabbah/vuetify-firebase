<template>
    <v-dialog v-model="dialog" width="350px" persistent>
        <v-btn fab small primary dark slot="activator">
            <v-icon>edit</v-icon>
        </v-btn>
        <v-card>
            <form>
                <v-card-title>
                    <span class="headline">Edit Meetup</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-text-field label="Title" name="title" id="title" v-model="editedTitle" autofocus required></v-text-field>
                    <v-text-field label="Location" name="location" id="location" v-model="editedLocation" required></v-text-field>
                    <v-text-field label="Description" name="description" id="description" v-model="editedDescription" required multiLine></v-text-field>
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
          editedTitle: this.meetup.title,
          editedLocation: this.meetup.location,
          editedDescription: this.meetup.description,
          dialog: false
        }
      },
      methods: {
        onSaveChanges () {
          if (this.editedTitle.trim() === '' || this.editedLocation.trim() === '' || this.editedDescription.trim() === '') return
          this.dialog = false
          this.$store.dispatch('updateMeetup', {
            title: this.editedTitle,
            location: this.editedLocation,
            description: this.editedDescription,
            id: this.meetup.id
          })
        }
      }
    }
</script>