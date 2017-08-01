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
        <button class="btn btn-primary" :disabled="maxGroupsReached" @click="createGroup()" v-lang.group.createGroupButton></button>
        <span v-if="maxGroupsReached" v-lang.group.maxGroupsReachedDesc></span>
    </div>
</template>

<script>
import helpers from '../../helpers'

export default {
    name: 'createGroup',
    data() {
        return {
            groupName: '',
            groupIsPrivate: false
        }
    },
    computed:{
        user() {
            return this.$store.getters.user;
        },
        maxGroupsReached(){
            return helpers.maxGroupsReached(this.user);
        },
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
                    this.groupCreated(result.body);
                })
                .catch((err) => console.error(err));
        },
        groupCreated(group){

            //Join the group - adds the new group to the store
            this.$store.dispatch("joinGroup", { group: group })

            //Create router object
            let formattedName = group.Name.replace(/\s+/g, '-').toLowerCase();            
            let newGroupRoute = {
                path: "/" + formattedName + "/" + group.Id,
                params: {
                    name: formattedName,
                    id: group.Id
                }
            }

            //Redirect to group page
            this.$router.push(newGroupRoute);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../../resources/custom-variables.scss';
@import '../../../resources/custom-mixins.scss';
</style>
