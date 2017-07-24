<template>
    <div class="groups">
        <h2 v-lang.group.yourGroups></h2>

        <router-link class="groups__link" 
            :to="{path: '/' + item.Name + '/' + item.Id, params: {name: item.Name, id: item.Id}}" 
            v-for="item in user.Groups" 
            :key="item.Id">

            {{item.Name}}
        </router-link>

        <button class="btn" v-lang.group.findGroup></button>
    </div>
</template>

<script>

export default {
    name: 'groups',
    props: ["user"]
}
</script>

<style lang="scss" scoped>
@import '../../resources/custom-variables.scss';
@import '../../resources/custom-mixins.scss';

.groups{

    &__link{
        display: block;
        margin-bottom: $default-spacing/2;
        padding: $default-spacing/2;
        background: $gray-lighter;

        &:hover{
            color: $white;
            background: $brand-primary;
        }
    }

    &__name{
        margin: 0;
        font-size: $font-size-large;
    }
}

</style>
