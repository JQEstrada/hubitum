<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/habitumlogo.png"
      style="width: 400px; height: 400px"
    >
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useGeneralStore } from '../stores/general'

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const router = useRouter()
    const generalStore = useGeneralStore()

    if (generalStore.isLoggedIn == "false") {
      router.push('/login')
    }
  }
})
</script>
