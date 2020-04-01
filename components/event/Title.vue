<template>
  <vs-row id="event-title">
      <vs-col vs-w="12">
          <h2>{{ title }}</h2>
      </vs-col>
      <vs-col vs-w="12">
          <p>{{ description }}</p>
      </vs-col>     
  </vs-row>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Event, EventId } from "~/models/Event";

@Component({
  name: "event-title",
})
export default class EventPageTitle extends Vue {
  @Prop() title: string;
  @Prop() description: string;
}
</script>
