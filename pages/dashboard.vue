<template>
  <div id="dashboard">
    <vs-row vs-justify="center">
      <vs-col vs-lg="6" vs-sm="9" vs-xs="11">
        <vs-card vs-align="left">
          <h3>Events</h3>
          <EventsList v-if="eventStore.events.length > 0" :events="eventStore.events"/>
          <router-link v-if="eventStore.events.length > 0" :to="{ name: 'EventCreate' }">Create Event</router-link>
          <div v-if="eventStore.events.length == 0 && !loading" class="no-created-events">You have no events =(
            <div>Anyway, you can
              <router-link :to="{ name: 'EventCreate' }">create one</router-link>!
            </div>
          </div>
        </vs-card>
      </vs-col>
    </vs-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
import { Event } from "~/models/Event";
import EventsList from "~/components/dashboard/events-list/EventsList.vue";
import { EventsStore } from '~/store/EventsStore';
Component.registerHooks(['fetch']);
@Component({
  name: "dashboard",
  components: {
    EventsList
  }
})
export default class Dashboard extends Vue {
  @Inject('eventsStore') events: EventsStore;
  loading: boolean = false;

  startLoading() {
    (<any>this).$vs.loading();
    this.loading = true;
  }
  async fetch({ $app, $axios }) {
    console.log(await $axios.get('/test'))
  }
  stopLoading() {
    (<any>this).$vs.loading.close();
    this.loading = false;
  }
  public get eventStore() {
    return this.events;
  }
}
</script>
