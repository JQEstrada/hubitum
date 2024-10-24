import { defineStore } from 'pinia'
//import { LocalStorage } from 'quasar'

export const useGeneralStore = defineStore('general', {
  state: () => ({
    isLoggedIn: (window.localStorage.getItem('isLoggedIn') || false),
    token: (window.localStorage.getItem('userToken') || ""),
    user: (window.localStorage.getItem('userObject') || {})
  }),
  getters: {
    loggedIn: (state) => state.isLoggedIn,
    appToken: (state) => state.token,
    appUser: (state) => state.user
  },
  actions: {
    setLoggedIn(isLogged) {
      this.isLoggedIn = isLogged
      window.localStorage.setItem('isLoggedIn', isLogged)
    },
    setToken(token) {
      this.token = token
      console.log("Setting token " + token)
      window.localStorage.setItem('userToken', token)
      if(token != "") this.setLoggedIn(true)
    },
    setUser(user) {
      this.user = user
      window.localStorage.setItem('userObject', user)
    },
    logout() {
      this.user = {}
      this.token = ""
      this.isLoggedIn = false
      window.localStorage.setItem('isLoggedIn', false)
      window.localStorage.setItem('user', {})
      window.localStorage.setItem('token', "")
    }
  },
})
