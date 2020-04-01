<template>
  <vs-popup title="Create action" class="popup-small" :active.sync="active">
    <vs-row style="margin-bottom: 16px;" vs-justify="space-around">
      <vs-radio color="success" v-model="mode" vs-value="add">Add</vs-radio>
      <vs-radio color="danger" v-model="mode" vs-value="spend">Spend</vs-radio>
    </vs-row>
    <vs-row vs-justify="center">
      <vs-input
        style="width: 100%; margin-bottom: 24px;"
        :danger="$v.amount.$error && $v.amount.$dirty"
        :danger-text="amountErrorMessage"
        placeholder="Amount *"
        v-model="$v.amount.$model"
      />
      <vs-textarea
        :counter="comment.length > 120 ? '160' : ''"
        label="Comment *"
        :counter-danger="$v.comment.$error"
        v-model="$v.comment.$model"
      />

      <vs-button @click="submit()" color="success" type="filled">Create</vs-button>
    </vs-row>
  </vs-popup>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Event } from "~/models/Event";
import { Action } from "~/models/Action";
import { Modal } from "./Modal";
import {
  required,
  email,
  numeric,
  between,
  maxLength
} from "vuelidate/lib/validators";

@Component({
  name: "create-action",
  validations: {
    amount: {
      required,
      numeric,
      between: between(0, 100000)
    },
    comment: {
      maxLength: maxLength(160),
      required
    }
  }
})
export default class CreateActionModal extends Modal {
  public action: Action = new Action();
  loading: boolean = false;
  amount: string = "0";
  comment: string = "";
  mode: string = "add";

  get amountErrorMessage() {
    if (this.$v.amount.$error && this.$v.amount.$dirty) {
      if (!this.$v.amount.required) return "Amount is required";
      if (!this.$v.amount.numeric) return "A value must be numeric";
      if (!this.$v.amount.between) return "A value must be between 0 and 100k";
    } else {
      return '';
    }
  }
  get color() {
    if(this.mode == 'add') return 'rgb(155, 250, 149)'
    if(this.mode == 'spend') return 'rgb(255, 71, 87)'
    return this.mode;
  }
  public reset() {
    this.amount = "0";
    this.comment = "";
    this.$v.$reset();
  }
  public submit() {
    if (!this.$v.$error) {
      this.$emit("create", {
        ...this.action,
        amount: this.mode === 'add' ? parseFloat(this.amount) : 0 -parseFloat(this.amount),
        comment: this.comment
      });
    }
  }
}
</script>