<template>

  <q-page class="flex flex-col items-center justify-center" style="height: 100vh;">

    <q-btn @click="goToNew" icon="add_circle_outline" label="New Habit" />

    <q-card class="q-ma-md self-center" style="width: 100%; text-align: center">
      <q-card-section>
        <h4>HABITS</h4>
      </q-card-section>
    </q-card>
    <div class="q-ma-md self-center" style="width: 100%; text-align: center" v-for="habit in habitList" :key=habit.id>
      <q-card class="col my-card">
        <router-link :to="{ name: 'EditHabit', params: { id: habit.id } }">
          <q-card-section>
              {{habit.name}}
          </q-card-section>
        </router-link>
      </q-card>
    </div>


  </q-page>

</template>

<script>
import { defineComponent, watch  } from 'vue'
import { useHabitStore } from '../stores/habits'
import HabitService from '../services/HabitService'
import { useGeneralStore } from '../stores/general'

const habitStore = useHabitStore()
const generalStore = useGeneralStore()



export default defineComponent({
  name: 'HabitHomeComponent',
  data() {
    return {
      habitList: [],
      generalStore: useGeneralStore()
    }
  },
  methods: {
    goToNew() {
      this.$router.push('/create-habit')
    },
    async loadHabits() {
      try {

        const habitResponse = await HabitService.getHabits();

        this.habitList = habitResponse.data;

      } catch (error) {
        console.log(error)
        this.error = error.response.data.error
      }
    }
  },
  mounted() {
    if(generalStore.habitDatesFetched) {
      this.loadHabits()
    }
  },
  watch: {
    'generalStore.habitDatesFetched': {
      handler(newVal) {
        console.log(newVal)
        if (newVal) {
          this.loadHabits()
        }
      }
    }
  }
})
</script>
