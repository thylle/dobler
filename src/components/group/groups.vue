<template>
    <div class="groups">
        <h2 v-lang.group.yourGroups></h2>

        <router-link class="group-list-item" 
            :to="{path: '/' + item.Name + '/' + item.Id, params: {name: item.Name, id: item.Id}}" 
            v-for="item in user.Groups" 
            :key="item.Id">

            {{item.Name}}
        </router-link>

        <button class="btn btn-primary" v-on:click="createGroup()" v-lang.group.createGroupButton></button> 
        <button class="btn" v-on:click="findNewGroup()" v-lang.group.findGroupButton></button>
    </div>
</template>

<script>

export default {
    name: 'groups',
    data(){
        return{
            user: this.$store.getters.user
        }
    },
    methods:{
        findNewGroup(){
            this.$router.push({name: 'groupsOverview'});
        },
        createGroup(){
            this.$router.push({name: 'createGroup'});
        }
    }
}
</script>

<style lang="scss">
@import '../../../resources/custom-variables.scss';
@import '../../../resources/custom-mixins.scss';

.groups{
    &__name{
        margin: 0;
        font-size: $font-size-large;
    }
}

</style>
