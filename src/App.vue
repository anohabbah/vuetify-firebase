<template>
  <v-app>
    <v-navigation-drawer temporary v-model="drawer">
      <v-list>
        <v-list-tile
                v-for="item in menuItems"
                :key="item.title"
                :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
          <v-list-tile-action><v-icon>exit_to_app</v-icon></v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary">
      <v-toolbar-side-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title><router-link to="/" tag="span" style="cursor: pointer;">DevMeetup</router-link></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
                flat
                v-for="item in menuItems"
                :key="item.title"
                :to="item.link"
        ><v-icon left dark>{{ item.icon }}</v-icon>{{ item.title }}</v-btn>
        <v-btn v-if="userIsAuthenticated" flat @click="onLogout"><v-icon left dark>exit_to_app</v-icon>Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: false
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          {icon: 'face', title: 'Sign Up', link: {name: 'SignUp'}},
          {icon: 'lock_open', title: 'Sign In', link: {name: 'SignIn'}}
        ]
        if (this.userIsAuthenticated) {
          menuItems = [
            {icon: 'supervisor_account', title: 'View Meetups', link: {name: 'Meetups'}},
            {icon: 'room', title: 'Organize Meetup', link: {name: 'CreateMeetup'}},
            {icon: 'person', title: 'Profile', link: {name: 'Profile'}}
          ]
        }
        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
