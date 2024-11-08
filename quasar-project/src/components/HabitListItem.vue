<template>
  <q-item
    clickable
    @click="onItemClick"
  >
    <q-item-section>
      <div>{{habit.name}}</div>
      <div>{{ habit.HabitDates[0].unitsDone + " / " + habit.goal}}</div>
    </q-item-section>

    <q-item-section side>
      <q-icon
        size="lg"
        name="add_circle"
        color="primary"
        @click.stop
      >
        <q-popup-proxy ref="popupCounter">
          <q-banner>

            <q-icon
              name="trending_up"
              color="primary"
              size="lg"
              class="q-mr-md"
            /> Update the current habit count.

            <div class="row items-center q-gutter-x-sm q-pt-md">
              <q-btn
                flat
                dense
                round
                size="lg"
                @click="removeCount"
                icon="remove_circle_outline"
              />

              <q-input
                v-model="localCounter"
                class="col"
                input-class="text-center"
              />

              <div class="text-caption q-px-sm"><span class="text-h6">{{ currentUnit.shortName }}</span></div>

              <q-btn
                flat
                dense
                round
                size="lg"
                icon="add_circle_outline"
                @click="addCount"
              />
            </div>
            <q-btn
              label="OK"
              @click="updateParent"
              color="primary"
              class="full-width q-mt-md"
            />

          </q-banner>
        </q-popup-proxy>
        </q-icon>

    </q-item-section>
    </q-item>

</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "HabitListItem",
  data() {
    return {
      localCounter: this.habit.HabitDates[0].unitsDone,
      currentUnit: ""
    };
  },
  props: ["habit", "units"],
  watch: {
    // Update localValue when the prop changes
    counter(newValue) {
      this.localCounter = newValue;
    },
  },
  methods: {
    getUnitsDoneCount(habitDateList) {
      console.log(habitDateList)
      return habitDateList.reduce((sum, item) => sum + item.unitsDone, 0);
    },
    addCount() {
      this.localCounter++;
    },
    removeCount() {
      if (this.localCounter > 0) this.localCounter--;
    },
    onItemClick() {
      this.$emit("item-clicked", this.habit.id);
    },
    updateParent() {
      this.$emit("update-counter", { count: this.localCounter, habitDateId: this.habit.HabitDates[0].id })
      this.$refs.popupCounter.hide()
    },
  },
  mounted() {

    this.currentUnit = this.units.find((unit) => { return unit.id == this.habit.unitId })

  }
});
</script>
<style scoped>
</style>
