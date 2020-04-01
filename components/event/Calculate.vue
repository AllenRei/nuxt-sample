<template>
  <vs-card v-if="event.actions.length > 0" class="calculate-card">
    <vs-row slot="header" vs-justify="space-between">
      <h3>Calculate</h3>
    </vs-row>
    <vs-row vs-justify="center">
      <vs-button @click="calculateEvent()" color="success" type="flat" icon="assessment">Calculate</vs-button>
    </vs-row>
    <div v-if="calculations.payers.length > 0" style="width: 100%;">
        <!-- <div>total payers: {{ calculations.payers.length }}</div> -->
        <Chain :chain="calculations.paymentChain" />
    </div>
  </vs-card>
</template>
<script lang="ts">
import { Component, Vue, Prop, Provide, Inject } from "vue-property-decorator";
import { Event } from "~/models/Event";
import Chain from './Chain.vue';

import { Calculation, ChainedCalculation } from '~/models/Calculation';

@Component({
  name: "calculate-event",
  components: {
      Chain
  }
})
export default class EventCalculate extends Vue {
  @Inject() event: Event;

  get calculations(): ChainedCalculation {
      return this.$app.eventItem.calculation;
  }
  calculateEvent() {
    this.$app.eventItem.getEvent(this.event._id).then(() => {
      this.$app.eventItem.calculateEventLegacy().then(() => {
          this.$forceUpdate()
      });
    });
  }
}
</script>