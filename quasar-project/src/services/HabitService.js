import Api from './Api'

export default {
  register (habit) {
    const token = localStorage.getItem('userToken'); // Retrieve JWT from localStorage

    return Api().post('habit-create', habit, {
      headers: {
        Authorization: `Bearer ${token}` // Include JWT in Authorization header
      }
    })
  },
  save (habit) {
    const token = localStorage.getItem('userToken'); // Retrieve JWT from localStorage

    return Api().post('habit-save', habit, {
      headers: {
        Authorization: `Bearer ${token}` // Include JWT in Authorization header
      }
    })
  },
  getHabits () {
    return Api().get('habit-getall')
  },
  getHabit (id) {
    return Api().get(`habit-getone/${id}`)
  },
  getFrequencyTypes () {
    return Api().get(`habit-getfrequencies`)
  },
  getUnitTypes () {
    return Api().get(`habit-getunittypes`)
  },
  getUnits () {
    return Api().get(`habit-getunits`)
  },
  updateHabitDateListForUser () {
    return Api().post(`habit-updateHabitDateListForUser`)
  }
}
