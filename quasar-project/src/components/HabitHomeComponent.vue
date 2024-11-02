<template>

  <q-page padding>


      <div style="display: flex; justify-content: flex-end; padding: 16px;">
        <q-btn @click="goToNew" icon="add_circle_outline" label="New Habit" />
      </div>

      <q-card class="q-ma-md self-center" style="text-align: center">

          <div class="row items-center justify-between q-my-md">
            <q-btn flat round icon="arrow_back" @click="goDateBack" />

            <div class="text-h6 text-center">
              {{ this.habitsDate.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' }) }}
              <q-icon name="event" size="md" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                  <q-date
                    v-model="formattedHabitsDate"
                    mask="YYYY-MM-DD"
                    today-btn
                    :options="date => new Date(date) <= new Date()"
                    @update:model-value="updateHabitsDate"
                  >
                    <div class="row items-center justify-end q-gutter-sm q-pa-sm">
                      <q-btn
                        v-close-popup
                        label="Select"
                        color="primary"
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>


            </div>

            <q-btn :disable="isToday(habitsDate)" flat round icon="arrow_forward" @click="goDateForward" />

          </div>

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
  computed:  {

    formattedHabitsDate: {
      get() {
        return this.habitsDate.toISOString().split('T')[0];
      },
      set(newValue) {
        this.habitsDate = new Date(newValue);
      }
    }


  },
  data() {
    return {
      habitsDate: new Date(),
      habitList: [],
      dailyHabitList: [],
      weeklyHabitList: [],
      monthlyHabitList: [],
      frequencyTypeList: [],
      dailyFrequencyTypeId: null,
      weeklyFrequencyTypeId: null,
      monthlyFrequencyTypeId: null,
      generalStore: useGeneralStore(),
      tab: ref('daily')
    }
  },
  methods: {
    updateHabitsDate(newDate) {
      this.habitsDate = new Date(newDate);
      this.loadHabits(); // Reload habits for the new date
    },
    goDateForward() {
      this.habitsDate = new Date(this.habitsDate.setDate(this.habitsDate.getDate() + 1))
      this.loadHabits()
    },
    goDateBack() {
      this.habitsDate = new Date(this.habitsDate.setDate(this.habitsDate.getDate() - 1))
      this.loadHabits()
    },
    isToday(date) {
      const today = new Date();
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    },
    handleHabitButtonClick(habitId) {
      alert(habitId)
    },
    handleHabitClick(habitId) {
      this.$router.push('/get-habit/' + habitId)
    },
    goToNew() {
      this.$router.push('/create-habit')
    },
    async loadData() {
      try {

        const frequencyListResponse = await HabitService.getFrequencyTypes();
        this.frequencyTypeList = frequencyListResponse.data;
        this.dailyFrequencyTypeId = this.frequencyTypeList.filter((frequencyType) => { return frequencyType.name == "Daily" })[0].id
        this.weeklyFrequencyTypeId = this.frequencyTypeList.filter((frequencyType) => { return frequencyType.name == "Weekly" })[0].id
        this.monthlyFrequencyTypeId = this.frequencyTypeList.filter((frequencyType) => { return frequencyType.name == "Monthly" })[0].id

        this.loadHabits()

      } catch (error) {
        console.log(error)
        this.error = error.response.data.error
      }
    },
    async loadHabits() {
        try {
          //const habitResponse = await HabitService.getHabits();
          const habitResponse = await HabitService.getDateHabits(new Date(this.habitsDate));

          this.habitList = habitResponse.data;

          this.dailyHabitList = this.habitList.filter((habit) => { return habit.frequencyTypeId == this.dailyFrequencyTypeId })
          this.weeklyHabitList = this.habitList.filter((habit) => { return habit.frequencyTypeId == this.weeklyFrequencyTypeId })
          this.monthlyHabitList = this.habitList.filter((habit) => { return habit.frequencyTypeId == this.monthlyFrequencyTypeId })

        } catch (error) {
          console.log(error)
          this.error = error.response.data.error
        }
    }
  },
  mounted() {
    if(generalStore.habitDatesFetched) {
      this.loadData()
    }
  },
  watch: {
    'generalStore.habitDatesFetched': {
      handler(newVal) {
        console.log(newVal)
        if (newVal) {
          this.loadData()
        }
      }
    }
  }
})
</script>
