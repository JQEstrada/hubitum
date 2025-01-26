<template>
  <q-item
    clickable
    @click="onItemClick"
  >
    <q-item-section side top>
      <div v-if="realStreak > 0 && isCurrentDate" class="q-pa-md q-gutter-md">
        <q-badge color="blue">
          <q-icon name="trending_up" color="white" class="q-ml-xs q-mr-xs" /> {{ realStreak }}
        </q-badge>
      </div>
      <div v-else-if="realStreak == 0 && habit.streak > 0 && isCurrentDate" class="q-pa-md q-gutter-md">
        <q-badge color="grey">
          <q-icon name="pending" color="white" class="q-ml-xs q-mr-xs" /> {{ realStreak }}
        </q-badge>
      </div>
      <div v-else class="q-pa-md q-gutter-md" style="visibility: hidden;">
        <q-badge color="blue">
          <q-icon name="trending_up" color="white" class="q-ml-xs q-mr-xs" /> 0
        </q-badge>
      </div>
    </q-item-section>
    <q-item-section>
      <div>{{habit.name}}</div>
      <div>{{ localCounter + " / " + habit.goal}}</div>
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
      localCounter: 0,
      localInitialCount: 0,
      currentUnit: ""
    };
  },
  computed: {
    realStreak() {
      let curStreak = 0;
      if (this.localCounter >= this.habit.goal) {
        curStreak = this.habit.streak;
      } else {
        curStreak = this.habit.streak - 1;
      }
      return curStreak;
    },
    isCurrentDate() {
      const today = new Date().toDateString();
      const currentDate = new Date(this.currentDate).toDateString();
      return today === currentDate;
    }
  },
  isHabitPending() {
    let habitPending = false;
    if (localCounter < this.habit.goal) {
      habitPending = true;
    }
    return habitPending;
  },
  props: ["habit", "units", "currentDate"],
  watch: {
    // Update localValue when the prop changes
    counter(newValue) {
      this.localCounter = newValue;
    },
    habit: {
      handler(newHabit) {
        this.currentUnit = this.units.find((unit) => { return unit.id == newHabit.unitId });
        this.localCounter = this.getUnitsDoneCount(newHabit.HabitDates);
        this.localInitialCount = this.getUnitsDoneCount(newHabit.HabitDates);
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    getUnitsDoneCount(habitDateList) {
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
      this.$emit("update-counter", { initialCount: this.localInitialCount, count: this.localCounter, habitDateId: this.habit.id, date: this.currentDate })
      this.$refs.popupCounter.hide()
    },
  }
});
</script>
<style scoped>
</style>
