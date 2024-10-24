import { defineStore } from 'pinia'
import { LocalStorage } from 'quasar'

export const useHabitStore = defineStore('habits', {
  state: () => ({
    habitList: (LocalStorage.getItem('habitList') || [])
  }),
  getters: {
    habits: (state) => state.habitList
  },
  actions: {
    saveHabit(habit) {
    }
  },
})
