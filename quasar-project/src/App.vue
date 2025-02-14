<template>
  <div>
    <!-- Main router view for the app content -->
    <q-layout>
      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
    <!-- Display loading indicator based on isLoading state -->

    <div class="overlay" v-if="generalStore.loading">
        <q-spinner-gears
          color="primary"
          size="2em"
        />
        <q-tooltip :offset="[0, 8]">QSpinnerGears</q-tooltip>
        <div>Loading your habits...</div>
      </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useGeneralStore } from './stores/general'
import HabitService from './services/HabitService'

export default defineComponent({
  name: 'App',
  async mounted() {

    const generalStore = useGeneralStore()
    console.log('App.vue mounted')
    if(generalStore.isLoggedIn == "true" || generalStore.isLoggedIn == true) {
      console.log('App.vue mounted and logged')
      generalStore.setLoading(true)
      generalStore.setHabitDatesFetched(false)
      const curDay = new Date(new Date().setHours(0, 0, 0, 0))
        console.log(generalStore.appHabitDatesFetchedCurrentDay)
      if(curDay != generalStore.appHabitDatesFetchedCurrentDay) {
        console.log('NOW!')
        const updateResponse = await HabitService.updateHabitDateListForUser();

      }
      generalStore.setLoading(false)
      generalStore.setHabitDatesFetched(true)
      generalStore.setHabitDatesFetchedCurrentDay()

    } else {

      generalStore.setLoading(false)

    }

  },
  setup() {
    const generalStore = useGeneralStore()

    return { generalStore }; // Make it accessible in the template
  }
})
</script>

<style scoped>
.overlay {
  align-items: center;
  background-color: white; /* Optional: translucent background */
  display: flex;
  flex-direction: column; /* Stack spinner and text vertically */
  height: 100vh;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 1000; /* Ensure it's above other content */
}
</style>
