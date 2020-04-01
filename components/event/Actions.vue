<template>
  <vs-card>
    <vs-row slot="header" vs-justify="space-between">
      <h3>Actions</h3>
      <vs-button
        @click="openAddActionModal()"
        size="small"
        color="success"
        type="flat"
        icon="add"
      >New action</vs-button>
    </vs-row>
    <ActionsList :actions="sortedActions"/>
    <CreateActionModal @create="handleCreate($event)" ref="add_action"/>
  </vs-card>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch, Inject } from "vue-property-decorator";
import { EventId, Event } from "~/models/Event";
import ActionsList from "./ActionsList.vue";
import CreateActionModal from "@/components/modals/CreateAction.vue";
import { Action } from "~/models/Action";

@Component({
  name: "event-actions",
  components: {
    ActionsList,
    CreateActionModal
  }
})
export default class EventActions extends Vue {

  @Inject() event: Event;

  public openAddActionModal() {
    (<any>this.$refs.add_action).open();
  }

  get sortedActions() {
    return this.event.actions.sort((a: Action, b: Action) : number => {
      if(a.date > b.date) return -1;
      if(a.date < b.date) return 1;
      return -1;
    })
  }
  
  public handleCreate(action: Action){
    this.$app.action.create(this.event._id, action).then(() => {
      this.$app.eventItem.getEvent(this.event._id).then( () => {
         this.$nextTick(() => {
          this.$forceUpdate()
         })
      });
    });
    (<any>this.$refs.add_action).hide();
    (<any>this.$refs.add_action).reset();

  }
}
</script>
