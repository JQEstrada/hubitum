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
        <q-select
          v-model="unitTypeId"
          :options="unitTypeList"
          option-value="id"
          option-label="name"
          filled
          emit-value
          map-options
          label="Measure"
          @update:model-value="updateUnitList(false)"
        />
        <q-select
          v-if="availableUnitList.length > 1"
          v-model="Habit.unitId"
          :options="availableUnitList"
          option-value="id"
          option-label="name"
          filled
          emit-value
          map-options
          label="Unit"
        />
        <q-input
          type="number"
          filled
          v-model="Habit.goal"
          label="Goal"
        />
        <q-toggle label="Current Habit?" v-model="Habit.isActive" />

        <div v-html="error"></div>
        <q-btn
          color="primary"
          @click="createOrEdit"
          :label="Habit.id > 0 ? 'Save' : 'Create'"
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
import { useGeneralStore } from "../stores/general";
import { useHabitStore } from "../stores/habits";
import HabitService from "../services/HabitService";

const habitStore = useHabitStore();
const generalStore = useGeneralStore();

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
      unitTypeId: 1,
      frequencyList: [],
      unitTypeList: [],
      unitList: [],
      availableUnitList: [],
      error: null,
    };
  },
  methods: {
    createOrEdit() {
      if(this.Habit.id > 0) {
        this.save()
      } else {
        this.create()
      }
    },
    async create() {
      try {
        const response = await HabitService.register(this.Habit);
        this.$router.push("/habits");
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
    async save() {
      try {
        console.log("Saving", this.Habit)
        const response = await HabitService.save(this.Habit);
        this.$router.push("/habits");
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    updateUnitList(isInitialize) {

      this.availableUnitList = this.unitList.filter((unit) => { return unit.unitTypeId == this.unitTypeId })

      // If updating lists and habit unit is not set
      if((!isInitialize || this.Habit.id == null) && this.availableUnitList.length) {
        this.Habit.unitId = this.availableUnitList[0].id
      }

    }
  },
  async mounted() {
    try {

      generalStore.setLoading(true)

      // Get all frequency types for selection
      const frequencyListResponse = await HabitService.getFrequencyTypes();
      this.frequencyList = frequencyListResponse.data;

      // Get all unit types for selection
      const unitTypeListResponse = await HabitService.getUnitTypes();
      this.unitTypeList = unitTypeListResponse.data;

      // Get all units for selection (depends on unit type)
      const unitListResponse = await HabitService.getUnits();
      this.unitList = unitListResponse.data;

      // If specific habit being requested, fetch by ID and pre-fill form for edition mode
      const id = this.$route.params.id;
      if (typeof id !== "undefined" && id != "") {
        const habitResponse = await HabitService.getHabit(id);
        this.Habit = habitResponse.data
        if(this.Habit.unitId == null) this.Habit.unitId = 1
        const currentUnit = this.unitList.find((unit) => { return unit.id == this.Habit.unitId }) // fetch current habit's unit object
        console.log("Unit: ", this.Habit)
        const currentUnitType = this.unitTypeList.find((unitType) => { return unitType.id == currentUnit.unitTypeId }) // fetch current habit unit's type object
        this.unitTypeId = currentUnitType.id // set form's unit type
      }

      // Update currently available unit list (depends on unit type)
      this.updateUnitList(true)

      generalStore.setLoading(false)

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
