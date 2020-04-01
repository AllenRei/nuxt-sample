<template>
<div class="user">
    <img :src="avatar" />
    <p class="name">{{ name }}</p>
</div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
    name: "User"
})
export default class User extends Vue {
    @Prop() name;
    @Prop() avatar;
}
</script>