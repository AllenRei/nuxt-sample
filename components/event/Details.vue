<template>
  <vs-card>
    <div slot="header">
      <h3>Details</h3>
    </div>
    <h1>Total: {{ total }}</h1>
    <h2>Turnover: {{ turnover }}</h2>
  </vs-card>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "event-details",
})
export default class EventDetails extends Vue {
  @Prop() total: number;
  @Prop() turnover: string;
  currency: string = "UAH";
}
</script>