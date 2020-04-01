<template>
  <div id="nuxt-app">
    <nuxt/>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DefaultLayout',
  created() {
    this._provided = this.$ctx;
  }
}
</script>
