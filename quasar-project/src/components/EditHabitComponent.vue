<template>
  <q-page class="flex flex-center">
      <div class="q-pa-md" style="text-align: center">
        <div class="q-gutter-md" style="max-width: 300px">
        <q-input type="text" filled v-model="Habit.name" label="Name" />
        <q-input type="textarea" filled v-model="Habit.description" label="Description" />
        <q-input type="date" filled v-model="Habit.startDate" label="Start Date" />
        <div v-html="error"></div>
        <q-btn color="primary" @click="create" label="Create" />
        <q-btn color="primary" @click="goBack" label="Return" />
       </div>
      </div>

  </q-page>

</template>

<script>
import { defineComponent } from 'vue'
import { useHabitStore } from '../stores/habits'
import HabitService from '../services/HabitService'

const habitStore = useHabitStore()

export default {
  name: 'EditHabitComponent',
  data() {
    return {
      Habit: {
        id: null,
        name: "",
        description: "",
        startDate: Date.now()
      },
      error: null
    }
  },
  methods: {
    async create() {

      try  {

        const response = await HabitService.register(this.Habit);
        this.$router.push('/habits')

      } catch (error) {
        console.log(error)
        this.error = error.response.data.error
      }


    },
    goBack() {

      this.$router.go(-1);
    }
  },
  async mounted() {
    try {

      // If specific habit being requested, fetch by ID and pre-fill form for edition mode
      const id = this.$route.params.id;
      if(typeof id !== "undefined" && id != "") {

        const response = await HabitService.getHabit(id);

        this.Habit = response.data;

      }

    } catch (error) {
      console.log(error)
      this.error = error.response.data.error
    }

  }
}
</script>
<style scoped>
  .error {
    color: red;
  }
  .intro-div {
    display: block;
    text-align: center;
    width: 100%
  }
</style>
