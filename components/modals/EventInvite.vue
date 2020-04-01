<template>
  <vs-popup title="Invite" :active.sync="active">
    <vs-row vs-justify="space-between">
      <vs-input
        v-model="$v.email.$model"
        placeholder="Email"
        :danger="$v.email.$error && $v.email.$dirty"
        danger-icon="add"
        danger-text="The email is invalid"
      />
      <vs-button @click="submit()" color="primary" icon="send" type="filled">Send</vs-button>
    </vs-row>
    <vs-row vs-justify="center">or</vs-row>
    <vs-row v-if="!link" vs-justify="center">
      <vs-button
        @click="generate()"
        color="primary"
        icon="create"
        type="filled"
      >Generate Link</vs-button>
    </vs-row>
    <vs-row v-else vs-justify="center">
      <vs-input disabled v-model="link" />
    </vs-row>
  </vs-popup>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Event } from "~/models/Event";
import { Modal } from "./Modal";
import { required, email } from "vuelidate/lib/validators";

@Component({
  name: "event-invite",
  validations: {
    email: {
      required,
      email
    }
  }
})

export default class EventInviteModal extends Modal {
  public email: string = "";
  public loading: boolean = false;

  @Prop() link: string;

  public submit() {
    if (!this.$v.$error) this.$emit("invite", this.email);
  }
  public generate() {
    this.$emit('generate');
  }
}
</script>