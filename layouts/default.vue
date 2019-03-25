<template>
  <div id="nuxt-app">
    <nuxt />
  </div>
</template>

<script lang="ts">
import { AppState } from '~/store/AppState';

export default {
  name: "DefaultLayout",
  provide: new AppState(),
}
</script>
