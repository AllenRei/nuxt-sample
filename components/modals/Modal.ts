import Vue from "vue";

export abstract class Modal extends Vue {
  active: boolean = false;
  public open() {
    this.active = true;
  }
  public hide() {
    this.active = false;
  }
}
