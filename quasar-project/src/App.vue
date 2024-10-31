<template>
  <div>
    <!-- Display loading indicator based on isLoading state -->
    <q-spinner v-if="generalStore.loading" size="50px" />

    <!-- Main router view for the app content -->
    <router-view />
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
      generalStore.setLoading(true)
      setTimeout(function(){ alert('this')}, 5000)
      // To do: only call this if action has not been called for this date
      const updateResponse = await HabitService.updateHabitDateListForUser();
      generalStore.setLoading(false)
  },
  setup() {
    const generalStore = useGeneralStore();
    return { generalStore }; // Make it accessible in the template
  }
})
</script>
