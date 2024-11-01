<template>

  <q-page padding>

    <q-btn @click="goToNew" icon="add_circle_outline" label="New Habit" />

    <q-card class="q-ma-md self-center" style="text-align: center">


      <q-tabs
        v-model="tab"
        dense
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="daily" label="DAILY" />
        <q-tab name="weekly" label="WEEKLY" />
        <q-tab name="monthly" label="MONTHLY" />
      </q-tabs>

      <q-separator />


          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="daily">

              <div class="text-h6">Daily Habits</div>
              <HabitListItem v-for="habit in dailyHabitList" :key=habit.id :habit="habit" @button-clicked="handleHabitButtonClick" @item-clicked="handleHabitClick" />

            </q-tab-panel>

            <q-tab-panel name="weekly">

              <div class="text-h6">Weekly Habits</div>
              <HabitListItem v-for="habit in weeklyHabitList" :key=habit.id :habit="habit" @button-clicked="handleHabitButtonClick" @item-clicked="handleHabitClick" />

            </q-tab-panel>

            <q-tab-panel name="monthly">

              <div class="text-h6">Monthly Habits</div>
              <HabitListItem v-for="habit in monthlyHabitList" :key=habit.id :habit="habit" @button-clicked="handleHabitButtonClick" @item-clicked="handleHabitClick" />

            </q-tab-panel>
          </q-tab-panels>



    </q-card>



  </q-page>

</template>

<script>
import { defineComponent, watch, ref  } from 'vue'
import { useHabitStore } from '../stores/habits'
import HabitService from '../services/HabitService'
import { useGeneralStore } from '../stores/general'
import HabitListItem from './HabitListItem.vue'

const habitStore = useHabitStore()
const generalStore = useGeneralStore()



export default defineComponent({
  name: 'HabitHomeComponent',
  components: {
    HabitListItem
  },
  data() {
    return {
      habitList: [],
      dailyHabitList: [],
      weeklyHabitList: [],
      monthlyHabitList: [],
      frequencyTypeList: [],
      generalStore: useGeneralStore(),
      tab: ref('daily')
    }
  },
  methods: {
    handleHabitButtonClick(habitId) {
      alert(habitId)
    },
    handleHabitClick(habitId) {
      this.$router.push('/get-habit/' + habitId)
    },
    goToNew() {
      this.$router.push('/create-habit')
    },
    async loadHabits() {
      try {

        const frequencyListResponse = await HabitService.getFrequencyTypes();
        this.frequencyTypeList = frequencyListResponse.data;
        const dailyFrequencyTypeId = this.frequencyTypeList.filter((frequencyType) => { return frequencyType.name == "Daily" })[0].id
        const weeklyFrequencyTypeId = this.frequencyTypeList.filter((frequencyType) => { return frequencyType.name == "Weekly" })[0].id
        const monthlyFrequencyTypeId = this.frequencyTypeList.filter((frequencyType) => { return frequencyType.name == "Monthly" })[0].id

        const habitResponse = await HabitService.getHabits();

        this.habitList = habitResponse.data;

        this.dailyHabitList = this.habitList.filter((habit) => { return habit.frequencyTypeId == dailyFrequencyTypeId })
        this.weeklyHabitList = this.habitList.filter((habit) => { return habit.frequencyTypeId == weeklyFrequencyTypeId })
        this.monthlyHabitList = this.habitList.filter((habit) => { return habit.frequencyTypeId == monthlyFrequencyTypeId })

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
