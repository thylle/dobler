<template>
    <div class="groups">
        <h2 class="heading" v-lang.group.yourGroups></h2>
    
        <router-link class="group-list-item" :to="createGroupRoute(item)" v-for="item in user.Groups" :key="item.Id">
            <span class="group-list-item__name">{{item.Name}}</span>
            <span class="group-list-item__info">#4 | 175,- 2k</span>
        </router-link>
    
        <button class="cta" :disabled="maxGroupsReached" v-on:click="createGroup()" v-lang.group.createGroupButton></button>
        <button class="cta" v-on:click="findNewGroup()" v-lang.group.findGroupButton></button>
        <span v-if="maxGroupsReached" v-lang.group.maxGroupsReachedDesc></span>
    </div>
</template>

<script>
import helpers from '../../helpers'

export default {
    name: 'groups',
    computed: {
        user() {
            return this.$store.getters.user;
        },
        maxGroupsReached(){
            return helpers.maxGroupsReached(this.user);
        },
    },
    methods: {
        findNewGroup() {
            this.$router.push({ name: 'groupsOverview' });
        },
        createGroup() {
            this.$router.push({ name: 'createGroup' });
        },
        createGroupRoute(item) {
            return {
                path: "/" + item.Name + "/" + item.Id,
                params: {
                    name: item.Name,
                    id: item.Id
                }
            }
        }
    }
}
</script>

<style lang="scss">
@import '../../../resources/custom-variables.scss';
@import '../../../resources/custom-mixins.scss';

.groups {
    &__name {
        margin: 0;
        font-size: $font-size-large;
    }
}
</style>
