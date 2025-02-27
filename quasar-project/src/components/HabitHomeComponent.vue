<template>

  <q-page padding>

    <div style="display: flex; justify-content: flex-end; padding: 16px;">
      <q-btn
        @click="goToNew"
        icon="add_circle_outline"
        label="New Habit"
      />
    </div>

    <q-card
      class="q-ma-md self-center"
      style="text-align: center"
    >

      <div class="row items-center justify-between q-my-md q-gutter-xs">
        <q-btn
          flat
          round
          icon="arrow_back"
          @click="goDateBack"
          class="col-shrink"
        />

        <div class="text-h6 text-center col-grow date-text">
          {{ this.habitsDate.toLocaleDateString("en-US", { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' }) }}
          <q-icon
            name="event"
            size="md"
            class="cursor-pointer"
          >
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
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

        <q-btn
          :disable="isToday(habitsDate)"
          flat
          round
          icon="arrow_forward"
          @click="goDateForward"
          class="col-shrink"
        />

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
        <q-tab
          name="daily"
          label="DAILY"
        />
        <q-tab
          name="weekly"
          label="WEEKLY"
        />
        <q-tab
          name="monthly"
          label="MONTHLY"
        />
        </q-tabs>

        <q-separator />

        <q-tab-panels
          v-model="tab"
          animated
        >
          <q-tab-panel name="daily">

            <div class="text-h6">Daily Habits</div>
            <HabitListItem
              v-for="habit in dailyHabitList"
              :key=habit.id
              :habit="habit"
              :units="unitList"
              :currentDate="habitsDate"
              @item-clicked="handleHabitClick"
              @update-counter="handleHabitUpdateCounter"
            />

          </q-tab-panel>

          <q-tab-panel name="weekly">

            <div class="text-h6">Weekly Habits</div>
            <HabitListItem
              v-for="habit in weeklyHabitList"
              :key=habit.id
              :habit="habit"
              :units="unitList"
              :currentDate="habitsDate"
              @item-clicked="handleHabitClick"
              @update-counter="handleHabitUpdateCounter"
            />

          </q-tab-panel>

          <q-tab-panel name="monthly">

            <div class="text-h6">Monthly Habits</div>
            <HabitListItem
              v-for="habit in monthlyHabitList"
              :key=habit.id
              :habit="habit"
              :units="unitList"
              :currentDate="habitsDate"
              @item-clicked="handleHabitClick"
              @update-counter="handleHabitUpdateCounter"
            />

          </q-tab-panel>
          </q-tab-panels>

          </q-card>

  </q-page>

</template>

<script>
import { defineComponent, watch, ref } from "vue";
import { useQuasar } from "quasar";
import { useHabitStore } from "../stores/habits";
import HabitService from "../services/HabitService";
import { useGeneralStore } from "../stores/general";
import HabitListItem from "./HabitListItem.vue";

const habitStore = useHabitStore();
const generalStore = useGeneralStore();

export default defineComponent({
  name: "HabitHomeComponent",
  components: {
    HabitListItem,
  },
  computed: {
    formattedHabitsDate: {
      get() {
        return this.habitsDate.toISOString().split("T")[0];
      },
      set(newValue) {
        this.habitsDate = new Date(newValue);
      },
    },
  },
  data() {
    return {

      habitsDate: new Date(),
      habitList: [],
      unitList: [],
      dailyHabitList: [],
      weeklyHabitList: [],
      monthlyHabitList: [],
      frequencyTypeList: [],
      dailyFrequencyTypeId: null,
      weeklyFrequencyTypeId: null,
      monthlyFrequencyTypeId: null,
      generalStore: useGeneralStore(),
      tab: ref("daily"),
    };
  },
  methods: {
    updateHabitsDate(newDate) {
      this.habitsDate = new Date(newDate);
      this.loadHabits(); // Reload habits for the new date
    },
    goDateForward() {
      this.habitsDate = new Date(
        this.habitsDate.setDate(this.habitsDate.getDate() + 1)
      );
      this.loadHabits();
    },
    goDateBack() {
      this.habitsDate = new Date(
        this.habitsDate.setDate(this.habitsDate.getDate() - 1)
      );
      this.loadHabits();
    },
    isToday(date) {
      const today = new Date();
      return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      );
    },
    async handleHabitUpdateCounter(newCountInfo) {

      try {

        const habitDateUpdate = await HabitService.updateHabitCount(newCountInfo);
        this.loadHabits()

      } catch(error) {

        console.log("Error: ", error)

        this.$q.notify({
          color: "negative",
          textColor: "white",
          icon: "report_problem",
          message: "Error updating habit",
          position: "top",
          multiLine: true,
          timeout: 4000
        })

      }
    },
    handleHabitClick(habitId) {
      this.$router.push("/get-habit/" + habitId);
    },
    goToNew() {
      this.$router.push("/create-habit");
    },
    async loadData() {
      try {
        generalStore.setLoading(true)
        // Get all units for selection (depends on unit type)
        const unitListResponse = await HabitService.getUnits();
        this.unitList = unitListResponse.data;

        const frequencyListResponse = await HabitService.getFrequencyTypes();
        this.frequencyTypeList = frequencyListResponse.data;
        this.dailyFrequencyTypeId = this.frequencyTypeList.filter(
          frequencyType => {
            return frequencyType.name == "Daily";
          }
        )[0].id;
        this.weeklyFrequencyTypeId = this.frequencyTypeList.filter(
          frequencyType => {
            return frequencyType.name == "Weekly";
          }
        )[0].id;
        this.monthlyFrequencyTypeId = this.frequencyTypeList.filter(
          frequencyType => {
            return frequencyType.name == "Monthly";
          }
        )[0].id;

        this.loadHabits(true);
      } catch (error) {
        console.log(error);
        this.error = error.response.data.error;
      } finally {
        generalStore.setLoading(false)
      }
    },
    async loadHabits(noLoad = false) {
      try {
        if (!noLoad) {
          generalStore.setLoading(true);
        }
        console.log("Loading habits for date: ", this.habitsDate);
        const habitResponse = await HabitService.getDateHabits(
          new Date(this.habitsDate)
        );

        this.habitList = habitResponse.data;



        this.dailyHabitList = this.habitList.filter(habit => {
          return habit.frequencytypeid == this.dailyFrequencyTypeId;
        });
        this.dailyHabitList.sort((a, b) => a.name.localeCompare(b.name));

        this.weeklyHabitList = this.habitList.filter(habit => {
          return habit.frequencytypeid == this.weeklyFrequencyTypeId;
        });
        this.weeklyHabitList.sort((a, b) => a.name.localeCompare(b.name));

        this.monthlyHabitList = this.habitList.filter(habit => {
          return habit.frequencytypeid == this.monthlyFrequencyTypeId;
        });
        this.monthlyHabitList.sort((a, b) => a.name.localeCompare(b.name));

      } catch (error) {
        console.log(error);
        this.error = error.response.data.error;
      } finally {
        if(!noLoad) {
          generalStore.setLoading(false);
        }
      }
    },
  },
  mounted() {
    if (generalStore.habitDatesFetched) {
      this.loadData();
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.generalStore.habitDatesFetched) {
        vm.loadData();
      }
    });
  },
  watch: {
    "generalStore.habitDatesFetched": {
      handler(newVal) {
        console.log(newVal);
        if (newVal) {
          this.loadData();
        }
      },
    },
  },
});
</script>

<style scoped>
.date-text {
  font-size: 1.7rem;
}

@media (max-width: 500px) {
  .date-text {
    font-size: 1.5rem;
  }
}

@media (max-width: 400px) {
  .date-text {
    font-size: 1rem;
  }
}
</style>
