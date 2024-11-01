<template>
  <q-page padding>
    <q-card class="q-ma-md self-center q-pa-md" style="text-align: center">
      <div
        class="q-gutter-md"
      >
        <q-input
          type="text"
          filled
          v-model="Habit.name"
          label="Name"
        />
        <q-input
          type="textarea"
          filled
          v-model="Habit.description"
          label="Description"
        />
        <q-input
          type="date"
          filled
          v-model="Habit.startDate"
          label="Start Date"
        />
        <q-select
          v-model="Habit.frequencyTypeId"
          :options="frequencyList"
          option-value="id"
          option-label="name"
          filled
          emit-value
          map-options
          label="Select Frequency"
        />
        <div v-html="error"></div>
        <q-btn
          color="primary"
          @click="create"
          label="Create"
        />
        <q-btn
          color="primary"
          @click="goBack"
          label="Return"
        />
        </div>
    </q-card>

  </q-page>

</template>

<script>
import { defineComponent } from "vue";
import { useHabitStore } from "../stores/habits";
import HabitService from "../services/HabitService";

const habitStore = useHabitStore();

export default {
  name: "EditHabitComponent",
  data() {
    return {
      Habit: {
        id: null,
        name: "",
        description: "",
        isActive: true,
        startDate: new Date().toISOString().split('T')[0],
        frequencyTypeId: null,
        unitId: null,
        goal: 1
      },
      frequencyList: [],
      unitList: [],
      unitTypeList: [],
      error: null,
    };
  },
  methods: {
    async create() {
      try {
        const response = await HabitService.register(this.Habit);
        this.$router.push("/habits");
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
    goBack() {
      this.$router.go(-1);
    },
  },
  async mounted() {
    try {
      // If specific habit being requested, fetch by ID and pre-fill form for edition mode
      const id = this.$route.params.id;
      if (typeof id !== "undefined" && id != "") {
        const habitResponse = await HabitService.getHabit(id);
        this.Habit = habitResponse.data;
      }

      const frequencyListResponse = await HabitService.getFrequencyTypes();
      this.frequencyList = frequencyListResponse.data;

      const unitTypeListResponse = await HabitService.getUnitTypes();
      this.unitTypeList = unitTypeListResponse.data;

      const unitListResponse = await HabitService.getUnits();
      this.unitList = unitListResponse.data;

    } catch (error) {
      this.error = error.response.data.error;
    }
  },
};
</script>
<style scoped>
.error {
  color: red;
}
.intro-div {
  display: block;
  text-align: center;
  width: 100%;
}
</style>
