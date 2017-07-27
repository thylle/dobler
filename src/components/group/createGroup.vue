<template>
    <div class="create-group">
        <h1>Create Group</h1>
        <div class="form-group">
            <input class="form-control mb" v-model="groupName" placeholder="Gruppe navn" />
        </div>
        <div class="form-group">
            <label>
                <input type="checkbox" v-model="groupIsPrivate" /> Privat gruppe
            </label>
        </div>
        <button class="btn btn-primary" @click="createGroup()" v-lang.group.createGroupButton></button>
    </div>
</template>

<script>
export default {
    name: 'createGroup',
    data() {
        return {
            user: this.$store.getters.user,
            groupName: '',
            groupIsPrivate: false
        }
    },

    methods: {
        createGroup() {
            let paramData = {
                name: this.groupName,
                isPrivate: this.groupIsPrivate,
                userId: this.user.User.Id
            }

            this.$http.get('data/createGroup', { params: paramData })
                .then(result => {
                    console.log("create group", paramData);
                })
                .catch((err) => console.error(err));
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../../resources/custom-variables.scss';
@import '../../../resources/custom-mixins.scss';
</style>
