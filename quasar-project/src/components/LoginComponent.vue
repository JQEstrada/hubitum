<template>
  <q-page class="flex flex-center">
      <div class="q-pa-md" style="text-align: center">
        <div class="q-gutter-md" style="max-width: 300px">
        <q-input type="email" filled v-model="email" label="email" />
        <q-input type="password" filled v-model="password" label="password" />
        <div v-html="error"></div>
        <q-btn color="primary" @click="login" label="Login" />
        <q-btn color="primary" @click="goToRegister" label="REGISTER" />
       </div>
      </div>

  </q-page>

</template>

<script>
import { defineComponent } from 'vue'
import AuthenticationService from '../services/AuthenticationService'
import { useGeneralStore } from '../stores/general'

const genStore = useGeneralStore()

export default {
  name: 'LoginComponent',
  data() {
    return {
      email: "",
      password: "",
      error: null
    }
  },
  methods: {
    goToRegister() {
      this.$router.push("/register")
    },
    async login() {

      try {
        const response= await AuthenticationService.login({
          email: this.email,
          password: this.password
        })

      genStore.setToken(response.data.token)
      genStore.setUser(response.data.user)

      // Redirect to the previously attempted page or a default page (e.g., dashboard)

      const redirectTo = this.$route.query.redirect || '/habits';
      this.$router.push(redirectTo);

      } catch (error) {
        console.log(error)
        this.error = error.response.data.error
      }
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
