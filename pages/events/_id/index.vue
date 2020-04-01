<template>
  <div id="event-page" class="container">
    <vs-row style="margin-bottom: 32px">
      <vs-col>
        <EventTitle :title="event ? event.title : ''" :description="event.description"/>
      </vs-col>
    </vs-row>
    <vs-row vs-justify="space-between" style="margin-bottom: 16px;">
      <vs-col vs-lg="6" vs-sm="12">
        <vs-row>
          <vs-col>
            <EventDetails :total="totalAmount" :turnover="grossAmount"/>
          </vs-col>
        </vs-row>
        <vs-row>
          <vs-col>
            <Actions :actions="event.actions"/>
          </vs-col>
        </vs-row>
      </vs-col>
      <vs-col vs-lg="5" vs-sm="12">
        <vs-row>
          <vs-col>
            <Participants
              :isAdmin="isAdmin"
              :participants="event.participants"
            />
          </vs-col>
          <vs-col>
            <Calculate />
          </vs-col>
        </vs-row>
      </vs-col>
    </vs-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Provide } from "vue-property-decorator";
import { Event, EventId } from "~/models/Event";
import { Action } from "~/models/Action";

import EventTitle from "~/components/event/Title.vue";
import ActionsList from "~/components/event/ActionsList.vue";
import EventDetails from "~/components/event/Details.vue";
import Actions from "~/components/event/Actions.vue";
import Participants from "~/components/event/Participants.vue";
import Calculate from "~/components/event/Calculate.vue";

Component.registerHooks(["beforeRouteEnter"]);
@Component({
  name: "event",
  components: {
    EventTitle,
    ActionsList,
    EventDetails,
    Actions,
    Participants,
    Calculate
  }
})
export default class EventPage extends Vue {
 // public event: Event = new Event();
  public actions = [];
  //public event : Event;
  @Provide() event: Event = this.eventItem;

  public get eventStore() {
    console.log('updated event item store', this.$app.eventItem);
    this.event = this.$app.eventItem.eventItem;
    return this.$app.eventItem;
  }
  public get eventItem() {
    console.log('updated event pointer')
    return this.eventStore.eventItem;
  }
  get totalAmount() {
    let amount = 0;
    this.event.actions.forEach(a => (amount += a.amount));
    return amount;
  }
  get isAdmin() {
    return !!this.event.admins.find(a => a === this.$app.account.account._id);
  }
  get grossAmount() {
    let gross = 0;
    this.event.actions.forEach(a => (gross += Math.abs(a.amount)));
    return gross;
  }
  created() {
    this.eventStore
  }
}
</script>
