import { defineStore } from 'pinia'
//import { LocalStorage } from 'quasar'

export const useGeneralStore = defineStore('general', {
  state: () => ({
    isLoggedIn: (window.localStorage.getItem('isLoggedIn') == "true" || false),
    token: (window.localStorage.getItem('userToken') || ""),
    user: (window.localStorage.getItem('userObject') || {}),
    isLoading: (window.localStorage.getItem('isLoading') || false),
    isHabitDatesFetched: (window.localStorage.getItem('isHabitDatesFetched') || false),
    habitDatesFetchedCurrentDay: (window.localStorage.getItem('habitDatesFetchedCurrentDay') || null)
  }),
  getters: {
    loggedIn: (state) => state.isLoggedIn,
    appToken: (state) => state.token,
    appUser: (state) => state.user,
    loading: (state) => state.isLoading,
    habitDatesFetched: (state) => state.isHabitDatesFetched,
    appHabitDatesFetchedCurrentDay: (state) => state.habitDatesFetchedCurrentDay
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
    },
    setLoading(isLoading) {
      this.isLoading = isLoading
      window.localStorage.setItem('isLoading', isLoading)
    },
    setHabitDatesFetched(isHabitDatesFetched) {
      this.isHabitDatesFetched = isHabitDatesFetched
      window.localStorage.setItem('isHabitDatesFetched', isHabitDatesFetched)
    },
    setHabitDatesFetchedCurrentDay() {
      this.habitDatesFetchedCurrentDay = new Date(new Date().setHours(0, 0, 0, 0));
      window.localStorage.setItem('habitDatesFetchedCurrentDay', new Date(new Date().setHours(0, 0, 0, 0)))
    }
  },
})
