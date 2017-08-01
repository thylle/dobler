<template>
    <div class="groups">
        <h2 v-lang.group.yourGroups></h2>
    
        <router-link class="group-list-item" :to="createGroupRoute(item)" v-for="item in user.Groups" :key="item.Id">
            {{item.Name}}
        </router-link>
    
        <button class="btn btn-primary" :disabled="maxGroupsReached" v-on:click="createGroup()" v-lang.group.createGroupButton></button>
        <button class="btn" v-on:click="findNewGroup()" v-lang.group.findGroupButton></button>
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
