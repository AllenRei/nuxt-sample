<template>
  <vs-collapse-item>
    <div slot="header">
      <vs-list-item :title="actionTitle" :subtitle="date">
        <template slot="avatar">
          <vs-avatar :src="author.avatar"/>
        </template>
      </vs-list-item>
      <div class="action-value">
        {{action.amount}} UAH
      </div>
    </div>
    <p> {{action.comment}} </p>
    
  </vs-collapse-item>
</template>
<script lang="ts">
import { Component, Vue, Prop, Inject } from "vue-property-decorator";
import { EventId, Event } from "~/models/Event";
import { Action } from "~/models/Action";
import moment from 'moment';
import { Participant } from '~/models/Participant';
import { AccountStore } from '~/store/AccountStore';

@Component({
  name: "action-item"
})
export default class ActionItem extends Vue {
  @Prop() action: Action;

  public get isPositive(){
      return this.action.amount > 0;
  }
  public get author() : Participant {
    return this.$app.user.getUser(this.action.author) as Participant;
  }
  public get actionTitle() {
      return `${this.author.name} ${this.action.amount > 0 ? 'added' : 'spent' } ${this.action.amount} ${this.action.currency || 'UAH'} `;
  }
  public get date() {
      return moment(this.action.date).format("dddd, MMMM Do YYYY");
  }
  emitChange(){}
}
</script>