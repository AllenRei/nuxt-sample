
<template>
    <vs-collapse class="events-list">
        <EventItem v-for="(event, i) in events" :key="i" :event="event" />
    </vs-collapse>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import EventItem from './EventItem.vue';
import { Event } from '~/models/Event';
@Component({
  name: "events-list-item",
  components: {
      EventItem
  }
})
export default class extends Vue {
    @Prop() events: Event[];
}
</script>
