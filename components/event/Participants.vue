<template>
  <vs-card>
    <vs-row slot="header" vs-justify="space-between">
      <h3>Participants</h3>
      <vs-button v-if="isAdmin"
        @click="openInvite()"
        size="small"
        color="success"
        type="flat"
        icon="person_add"
      >Invite</vs-button>
    </vs-row>
    <vs-list-item v-for="(p, i) in participants" :key="i" 
                  :title="getUser(p).name">
      <template slot="avatar">
        <vs-avatar :src="getUser(p).avatar"/>
      </template>
    </vs-list-item>
    <vs-row v-if="event.participants.length > 5 && !showAll" vs-justify="center">
      <a @click="showMore()" class="show-more">Show More</a>
    </vs-row>
    <EventInviteModal v-if="isAdmin" :link="link" @generate="generate()" @invite="sendInvite($event)" ref="invite" />
  </vs-card>
</template>
<script lang="ts">
import { Component, Vue, Prop, Inject } from "vue-property-decorator";
import EventInviteModal from '~/components/modals/EventInvite.vue';
import { Event } from '~/models/Event';

@Component({
  name: "participants-list",
  components: {
    EventInviteModal
  }
})
export default class ParticipantsList extends Vue {
  @Prop() isAdmin: boolean;

  @Inject() event: Event;

  public showAll: boolean = false;

  get participants() {
    if(this.showAll) {
      return this.event.participants
    }else {
      return this.event.participants.slice(0,5);
    }
  }
  public inviteCode = "";
  get link(){
    return this.inviteCode.length > 0 
            ? `${location.host}/invite?code=${this.inviteCode}`
            : false;
  }

  public openInvite(){
    (<any>this.$refs.invite).open();
  }

  public getUser(id) {
    return this.$app.user.getUser(id);
  }
  public sendInvite(email: string) {
//    return this.$app.event.sendInvite(this.eventId, email)
  }
  public showMore() {
    this.showAll = true; 
  }
  public generate() {
    this.$app.eventItem.generateInvite().then(res => {
      this.inviteCode = res.code;
    });
  }
}
</script>