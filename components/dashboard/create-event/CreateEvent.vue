<template>
  <vs-collapse-item>
    <div slot="header">{{ event.title }}</div>
    {{ event.description }}
    <vs-row vs-justify="flex-end">
      <vs-button @click="goToEvent()" color="primary" type="filled">Go to event</vs-button>
    </vs-row>
  </vs-collapse-item>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Event } from "~/models/Event";
@Component({
  name: "events-list-item"
})
export default class extends Vue {
  @Prop() public event: Event;
  goToEvent() {
    this.$router.push({
      name: "Event",
      params: {
        eid: this.event._id
      }
    });
  }
}
</script>
