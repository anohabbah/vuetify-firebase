<template>
    <v-container>
        <v-layout row wrap v-if="error">
            <v-flex xs12 sm6 offset-sm3>
                <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
            </v-flex>
        </v-layout>

        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <form @submit.prevent="onSignUp">
                        <v-card-text>
                            <v-container>
                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="email"
                                                label="Address E-mail"
                                                id="email"
                                                v-model="email"
                                                type="email"
                                                autofocus
                                                required></v-text-field>
                                    </v-flex>
                                </v-layout>

                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="password"
                                                label="Password"
                                                id="password"
                                                v-model="password"
                                                type="password"
                                                required></v-text-field>
                                    </v-flex>
                                </v-layout>

                                <v-layout row>
                                    <v-flex xs12>
                                        <v-text-field
                                                name="confirmPassword"
                                                label="Confirm Password"
                                                id="confirmPassword"
                                                v-model="confirmPassword"
                                                type="password"
                                                :rules="[comparePasswords]"
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                    block
                                    type="submit"
                                    class="primary"
                                    :disabled="!formIsValid || loading"
                                    :loading="loading"
                            >
                                Sign Up
                                <span slot="loader" class="custom-loader">
                                    <v-icon light>cached</v-icon>
                                </span>
                            </v-btn>
                        </v-card-actions>
                    </form>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
      data () {
        return {
          email: '',
          password: '',
          confirmPassword: ''
        }
      },
      computed: {
        comparePasswords () {
          return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
        },
        formIsValid () {
          return this.email !== '' && this.password !== '' && this.confirmPassword !== ''
        },
        user () {
          return this.$store.getters.user
        },
        loading () {
          return this.$store.getters.loading
        },
        error () {
          return this.$store.getters.error
        }
      },
      watch: {
        user (value) {
          if (value !== null && value !== undefined) {
            return this.$router.push('/')
          }
        }
      },
      methods: {
        onSignUp () {
          if (!this.formIsValid) return
          let credentials = {
            email: this.email,
            password: this.password
          }
          this.$store.dispatch('signUserUp', credentials)
        },
        onDismissed () {
          this.$store.dispatch('clearError')
        }
      }
    }
</script>
