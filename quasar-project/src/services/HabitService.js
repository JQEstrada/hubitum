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
  getHabits () {
    return Api().get('habit-getall')
  },
  getHabit (id) {
    return Api().get(`habit-getone/${id}`)
  }
}
