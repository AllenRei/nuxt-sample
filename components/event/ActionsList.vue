<template>
    <vs-row v-if="actions.length > 0" class="actions">
      <vs-collapse accordion class="actions" >
        <ActionItem v-for="(action, i) in actions" 
                    :key="i" 
                    :action="action"/>
      </vs-collapse>
    </vs-row>
    <vs-row v-else class="actions" vs-justify="center">
      <h2>No actions yet.</h2>
    </vs-row>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ActionItem from "./Action.vue";
import { Action } from '~/models/Action';

@Component({
  name: "actions-list",
  components: {
    ActionItem
  }
})
export default class ActionsList extends Vue {
  @Prop() actions: Action[];
  emitChange() {}
}
</script>
