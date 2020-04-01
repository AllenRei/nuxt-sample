<template>
    <div class="chain-list">
        <div class="chain-item" v-for="(c, i) in chain" :key="i">
            <User :avatar="getUser(c.from).avatar" :name="getUser(c.from).name" />
            <p class="amount">=> {{ c.amount }} </p>
            <User :avatar="getUser(c.to).avatar" :name="getUser(c.to).name" />
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import User from '~/components/lib/User'; 

@Component({
    name: "chain",
    components: {
        User
    }
})
export default class ChainedParticipants extends Vue {
    @Prop() chain: any[];
    
    public getUser(id) {
        return this.$app.user.getUser(id);
    }
}
</script>