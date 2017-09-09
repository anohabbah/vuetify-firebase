<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h4 class="secondary--text">Create new Meetup</h4>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12>
                <form @submit.prevent="onCreateMeetup">
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="title"
                                label="Meetup Title"
                                id="title"
                                v-model="title"
                                required autofocus></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="location"
                                label="Location"
                                id="location"
                                v-model="location"
                                required></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <img :src="imageUrl" width="200">
                            <v-btn raised class="primary" @click="onPickFile" style="margin: 0">Upload Image</v-btn>
                            <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked">
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                                name="description"
                                label="Description"
                                id="description"
                                multiLine
                                v-model="description"
                                required></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <h4>Choose Date & Time</h4>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-date-picker v-model="date"></v-date-picker>
                        </v-flex>
                    </v-layout>

                    <v-layout row class="mt-2">
                        <v-flex xs12 sm6 offset-sm3>
                            <v-time-picker v-model="time" format="24hr"></v-time-picker>
                        </v-flex>
                    </v-layout>

                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn class="primary" :disabled="!formIsValid" type="submit">Create Meetup</v-btn>
                        </v-flex>
                    </v-layout>
                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
      data () {
        return {
          title: '',
          location: '',
          imageUrl: '',
          description: '',
          date: new Date(),
          time: new Date(),
          image: null
        }
      },
      computed: {
        formIsValid () {
          return this.title !== '' && this.location !== '' && this.imageUrl !== '' && this.description !== ''
        },
        submittableDateTime () {
          const date = new Date(this.date)
          if (typeof this.time === 'string') {
            const hours = this.time.match(/^(\d+)/)[1]
            const minutes = this.time.match(/:(\d+)/)[1]
            date.setHours(hours)
            date.setMinutes(minutes)
          } else {
            date.setHours(this.time.getHours())
            date.setMinutes(this.time.getMinutes())
          }
          return date
        }
      },
      methods: {
        onCreateMeetup () {
          if (!this.formIsValid) return
          const meetup = {
            title: this.title,
            location: this.location,
            description: this.description,
            image: this.image,
            date: this.submittableDateTime
          }
          this.$store.dispatch('createMeetup', meetup)
          this.$router.push('/meetups')
        },
        onPickFile () {
          this.$refs.fileInput.click()
        },
        onFilePicked (event) {
          const files = event.target.files
          let filename = files[0].name
          if (filename.lastIndexOf('.') < 0) {
            return alert('Please add a valid file!')
          }
          const fileReader = new FileReader()
          fileReader.addEventListener('load', () => {
            this.imageUrl = fileReader.result
          })
          fileReader.readAsDataURL(files[0])
          this.image = files[0]
        }
      }
    }
</script>
