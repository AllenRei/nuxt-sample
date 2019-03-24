<template>
  <section class="container">
    <div>
      <h1 class="title">
        cashcrowd-nuxt
      </h1>
      <p>{{test}}</p>
    </div>
  </section>
</template>
<script lang="ts">
import { Component, Vue, Inject } from "vue-property-decorator";

@Component({
  name: "Indeex"
})
export default class extends Vue {
  @Inject('test') test;
  mounted() {
    setTimeout(() => {
      this.test.setTitle("Blya")
      setTimeout(() => {
        this.test.kek.name = "kurwa"
      },2000)
    }, 5000)
  }
}
</script>
<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
