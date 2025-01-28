<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="storeLoggedIn==true"
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          Habitum
        </q-toolbar-title>
        <q-btn v-if="storeLoggedIn=='false' && routeName != '/login'" color="primary" label="Sign In" @click="navigateTo('login')" />
        <q-btn v-if="storeLoggedIn==true" color="primary" label="Log Out" @click="logout()" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'
import { useGeneralStore } from '../stores/general'
import { useRoute } from 'vue-router'

export default defineComponent({
  name: 'MainLayout',
  components: {
    EssentialLink
  },
  data() {
    return {
      routeName: ''
    }
  },
  computed: {
    storeLoggedIn() {
      return this.genStore.isLoggedIn
    }
  },
  methods: {
    navigateTo(route) {
      this.routeName = '/' + route
      this.$router.push(route);
    },
    logout() {
      this.genStore.logout()
      this.$router.push({
        name: 'root'
      })
      this.routeName = this.$route.path
    }
  },
  watch: {
    // Watch for changes in the route and update the data reactively
    $route(to) {
      this.routeName = to.path
    }
  },
  beforeMount() {
    this.routeName = this.$route.path
  },
  setup () {
    const leftDrawerOpen = ref(false)
    const genStore = useGeneralStore()

    return {
      essentialLinks: [
        {
          title: 'Habits',
          caption: 'My habit list',
          icon: 'check',
          link: '/habits'
        }
      ],
      leftDrawerOpen,
      genStore,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
