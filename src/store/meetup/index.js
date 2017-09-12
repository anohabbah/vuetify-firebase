import * as firebase from 'firebase'

export default {
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://www.gentlegiant.com/wp-content/uploads/2015/06/New-York.jpg',
        id: 'qsfbsbdqbsdjgb',
        title: 'Meetup in New York',
        date: new Date(),
        location: 'New York',
        description: 'Dexter, secundus toruss sed mire prensionem de lotus, salvus epos. Domesticus deuss ducunt ad terror.'
      },
      {
        imageUrl: 'https://static.pexels.com/photos/338515/pexels-photo-338515.jpeg',
        id: 'kjwnvjsdjvkjds',
        title: 'Meetup in Paris',
        date: new Date(),
        location: 'Paris',
        description: 'Dexter, secundus toruss sed mire prensionem de lotus, salvus epos. Domesticus deuss ducunt ad terror.'
      },
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/29/SaintPaul.JPG',
        id: 'udfsbisgjjgndd',
        title: 'Meetup in Abidjan',
        date: '2017-06-23',
        location: 'Abidjan',
        description: 'Dexter, secundus toruss sed mire prensionem de lotus, salvus epos. Domesticus deuss ducunt ad terror.'
      },
      {
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Independence_Arch_-_Accra%2C_Ghana1.jpg',
        id: 'jsjngjfkkddkff',
        title: 'Meetup in Accra',
        date: '2017-06-15',
        location: 'Accra',
        description: 'Dexter, secundus toruss sed mire prensionem de lotus, salvus epos. Domesticus deuss ducunt ad terror.'
      }
    ]
  },
  mutations: {
    setLoadedMeetups (state, payload) {
      state.loadedMeetups = payload
    },
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    updateMeetup (state, payload) {
      const meetup = state.loadedMeetups.find(meetup => {
        return meetup.id === payload.id
      })
      if (payload.title) {
        meetup.title = payload.title
      }
      if (payload.location) {
        meetup.location = payload.location
      }
      if (payload.description) {
        meetup.description = payload.description
      }
      if (payload.date) {
        meetup.date = payload.date
      }
    }
  },
  actions: {
    loadMeetups ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
        .then(data => {
          let meetups = []
          let obj = data.val()
          for (let key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              location: obj[key].location,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        })
        .catch(error => {
          console.log(error)
          commit('setLoading', false)
        })
    },
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let imageUrl, key
      firebase.database().ref('meetups').push(meetup)
        .then((data) => {
          key = data.key
          return key
        })
        .then(key => {
          const filename = payload.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
        })
        .then(fileData => {
          imageUrl = fileData.metadata.downloadURLs[0]
          return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
        })
        .then(() => {
          commit('createMeetup', {
            ...meetup,
            id: key,
            imageUrl: imageUrl
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    updateMeetup ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.location) {
        updateObj.location = payload.location
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObj)
        .then(() => {
          commit('updateMeetup', payload)
          commit('setLoading', false)
        })
        .catch((err) => {
          console.log(err)
          commit('setLoading', false)
        })
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((a, b) => {
        return a.date > b.date
      })
    },
    featureMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    }
  }
}
