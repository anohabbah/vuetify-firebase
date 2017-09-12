import * as firebase from 'firebase'

export default {
  state: {
    user: null
  },
  mutations: {
    registerUserForMeetup (state, payload) {
      const id = payload.id
      if (state.user.registeredMeetups.findIndex(meetupId => meetupId === id) >= 0) {
        return
      }
      state.user.registeredMeetups.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    unregisterUserFromMeetup (state, payload) {
      const registeredMeetups = state.user.registeredMeetups
      registeredMeetups.splice(registeredMeetups.findIndex(meetupId => meetupId === payload), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    registerUserForMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      firebase.database().ref('/users/' + user.id).child('/registrations/').push(payload)
        .then((onResolve) => {
          commit('registerUserForMeetup', {id: payload, fbKey: onResolve.key})
          commit('setLoading', false)
        })
        .catch(onReject => {
          console.log(onReject)
          commit('setLoading', false)
        })
    },
    unregisterUserFromMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.fbKeys) {
        return
      }
      const fbKey = user.fbKeys[payload]
      firebase.database().ref('/users/' + user.id + '/registrations/').child(fbKey)
        .remove()
        .then(() => {
          commit('setLoading', false)
          commit('unregisterUserFromMeetup', payload)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser = {
              id: user.uid,
              registeredMeetups: [],
              fbKeys: {}
            }
            commit('setUser', newUser)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false)
          commit('setUser', {id: user.uid, registeredMeetups: [], fbKeys: {}})
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        })
    },
    onAutoSignIn ({commit}, payload) {
      commit('setUser', {id: payload.uid, registeredMeetups: [], fbKeys: {}})
    },
    logout ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    },
    fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      firebase.database().ref('/users/' + getters.user.id + '/registrations/')
        .once('value')
        .then(data => {
          const values = data.val()
          let registeredMeetups = []
          let swappedPairs = {}
          for (let key in values) {
            registeredMeetups.push(values[key])
            swappedPairs[values[key]] = key
          }
          const updatedUser = {
            id: getters.user.id,
            registeredMeetups: registeredMeetups,
            fbKeys: swappedPairs
          }
          commit('setUser', updatedUser)
          commit('setLoading', false)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
