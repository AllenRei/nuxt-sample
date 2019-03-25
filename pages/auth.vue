<template>
  <vs-card>
    <div slot="header">
      <h3>
        CashCrowd
      </h3>
    </div>
    <vs-row vs-align="flex-start" vs-type="flex" vs-justify="center" vs-w="12">
      <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="8">
        <vs-button @click="authorize()" color="danger" vs-type="border" vs-icon="home">Authorize with Google</vs-button>
      </vs-col>
    </vs-row>
  </vs-card>
</template>

<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";
import { AuthStore } from '~/store/AuthStore';

@Component({
  name: "authentication",
})
export default class extends Vue {
  public store = new AuthStore();
  @Inject('auth') auth: AuthStore;
  public async authorize() {
    const code = this.$route.query.invite as string;
    await this.auth.authentication();
    if(code) await this.$app.event.redeemInvite(code)
    this.$router.push('/dashboard');
  }
}

</script>
