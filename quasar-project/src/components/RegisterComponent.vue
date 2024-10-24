<template>
  <q-page class="flex flex-center">
      <div class="q-pa-md" style="text-align: center">
        <div class="q-gutter-md" style="max-width: 300px">
        <q-input type="email" filled v-model="email" label="email" />
        <q-input type="password" filled v-model="password" label="password" />
        <div v-html="error"></div>
        <q-btn color="primary" @click="register" label="Register" />
       </div>
      </div>

  </q-page>

</template>

<script>
import { defineComponent } from 'vue'
import AuthenticationService from '../services/AuthenticationService'
import { useGeneralStore } from '../stores/general'

//const genStore = useGeneralStore()

export default defineComponent({
  name: 'RegisterComponent',
  data() {
    return {
      email: "",
      password: "",
      error: null
    }
  },
  methods: {
    async register() {
      try {
        const response= await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        //genStore.setLoggedIn(response.token != "")
        //genStore.setToken(response.token)
        //genStore.setUser(response.user)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
})
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
