<template>
    <q-item clickable @click="onItemClick">
      <q-item-section>
        <div>{{habit.name}}</div>
      </q-item-section>

      <q-item-section side>
        <q-btn @click.stop="onButtonClick" label="Action" color="primary" />
      </q-item-section>
    </q-item>

</template>

<script>
import { defineComponent } from 'vue'

//const genStore = useGeneralStore()

export default defineComponent({
  name: 'HabitListItem',
  props: ['habit'],
  methods: {
    onButtonClick() {
      this.$emit("button-clicked", this.habit.id)
    },
    onItemClick() {
      this.$emit("item-clicked", this.habit.id)
    }
  }
})
</script>
<style scoped>

</style>
