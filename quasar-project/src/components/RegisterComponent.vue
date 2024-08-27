<template>
  <q-page class="flex flex-center">
    TESTE
    <input type="email" name="email" placeholder="email" v-model="email" />
    <input type="password" name="password" placeholder="password" v-model="password"/>
    <button @click="register">Register</button>
  </q-page>

</template>

<script>
import { defineComponent } from 'vue'
import AuthenticationService from '../services/AuthenticationService'

export default defineComponent({
  name: 'RegisterComponent',
  data() {
    return {
      email: "aaa",
      password: "aaa"
    }
  },
  methods: {
    async register() {
      const response= await AuthenticationService.register({
        email: this.email,
        password: this.password
      })
      console.log(response.data);
    }
  }
})
</script>
