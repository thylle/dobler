<template>
    <div class="group">
        <template v-if="group">
    
            <!-- Page Header -->
            <div class="group__header  clearfix">
                <h1 class="pull-left">{{group.Name}}</h1>
    
                <div class="group__header-actions">
                    <!-- Join Group  -->
                    <button class="btn btn-primary" v-if="!group.Private && !userIsMember" @click="joinGroup(group)">
                        <span v-lang.group.joinGroupButton></span>
                    </button>
    
                    <!-- Leave Group  -->
                    <button class="btn" v-show="!group.Private && userIsMember" @click="leaveGroup(group)">
                        <span v-lang.group.leaveGroupButton></span>
                    </button>
    
                    <!-- Change Group  -->
                    <button class="btn" @click="showModal = true">
                        <span v-lang.group.changeGroupButton></span>
                    </button>
                </div>
            </div>
    
            <template v-if="!userIsMember">
                <p v-if="!group.Private" v-lang.group.notAMemberDesc></p>
                <p v-if="group.Private" v-lang.group.groupIsPrivateDesc></p>
            </template>
    
            <template v-if="userIsMember">
                <div class="row">
                    <div class="col-xs-12 col-sm-8">
    
                        <!-- The Catalog - TODO Change name to Program  -->
                        <catalog :selectedOdds="selectedOdds"></catalog>
                    </div>
                    <div class="col-xs-12 col-sm-4">
    
                        <!-- The Users Coupons for the Group  -->
                        <couponItem :coupon="item" v-if="item.GroupId == group.Id" v-for="item in sortedCoupons" :key="item.Id">
                        </couponItem>
                    </div>
                </div>
    
                <!-- The Group Table Overview -->
                <groupTable :group="group"></groupTable>
    
                <!-- The coupon -->
                <coupon :group="group" :selectedOdds="selectedOdds" @couponAdded="reset()"></coupon>
            </template>


            <!-- Modal popup to change group -->
            <modal v-if="showModal" @close="showModal = false">
                <p slot="header" v-lang.group.changeGroupTitle></p>

                <div slot="body">
                    <p v-lang.group.changeGroupDesc></p>

                    <router-link class="groups__link btn" v-if="item.Id !== group.Id" :to="{path: '/' + item.Name + '/' + item.Id, params: {name: item.Name, id: item.Id}}" v-for="item in user.Groups" :key="item.Id">
                        {{item.Name}}
                    </router-link>

                    <!-- If the user is only member of 1-2 groups - show a "find group" button -->
                    <button class="groups__link btn btn-primary mt1" :disabled="user.Groups.length == 3" @click="findNewGroup()" v-lang.group.findGroupButton></button>

                    <small v-if="user.Groups.length == 3" v-lang.group.maxNrOfGroups></small>
                </div>
            </modal>
        </template>
    
        <template v-else>
            <h1>No group found</h1>
        </template>
    </div>
</template>

<script>
import coupon from '../coupon/coupon.vue'
import couponItem from '../coupon/couponItem.vue'
import catalog from '../catalog.vue'
import groupTable from './groupTable.vue'
import modal from '../modal.vue'

export default {
    name: 'group',
    data() {
        return {
            user: this.$store.getters.user,
            group: null,
            showModal: false,
            userIsMember: false,
            selectedOdds: []
        }
    },
    components: {
        coupon,
        couponItem,
        catalog,
        modal,
        groupTable
    },
    created() {
        this.getGroupData(this.$route.params.id);
    },
    beforeRouteUpdate(to, from, next) {
        setTimeout(() => {
            this.getGroupData(to.params.id);
            this.reset();
            this.showModal = false;

            next();
        }, 300);
    },

    computed: {
        sortedCoupons: function () {
            this.user.Coupons.sort((a, b) => {
                return new Date(b.Created) - new Date(a.Created);
            });
            return this.user.Coupons;
        },
    },

    methods: {
        reset() {
            this.selectedOdds = [];
            console.log("selected odds was reset...");
        },

        getGroupData(id) {
            var groupId = parseInt(id);

            this.$http
                .get('data/getGroup', { params: { id: groupId } })
                .then(response => {
                    this.group = response.body;
                    this.checkIfUserIsMember();
                })
                .catch((err) => console.error(err));
        },

        //Get the users group that matches the id from the URL.
        checkIfUserIsMember() {
            for (let i = 0; i < this.user.Groups.length; i++) {
                let item = this.user.Groups[i];

                if (item.Id === this.group.Id) {
                    this.group = item;
                    this.userIsMember = true;
                    return;
                }
            }

            //If the loop did not find a match then it wont return and the current user is not a member.
            this.userIsMember = false;
        },

        findNewGroup() {
            this.$router.push({ name: 'groupsOverview' });
        },

        leaveGroup(group) {
            let groupData = {
                UserId: this.user.User.Id,
                GroupId: group.Id
            }

            this.$http
                .get('data/leaveGroup', { params: groupData })
                .then(response => {
                    //Update the item on the list, so that the user is a member of this group
                    group.UserIsMember = false;

                    //Dispatch to remove the new group to the store
                    this.$store.dispatch("leaveGroup", { group: group })
                    this.checkIfUserIsMember();
                })
                .catch((err) => console.error(err));
        },

        joinGroup(group) {
            let groupData = {
                UserId: this.user.User.Id,
                GroupId: group.Id
            }

            this.$http
                .get('data/joinGroup', { params: groupData })
                .then(response => {
                    //Update the item on the list, so that the user is a member of this group
                    group.UserIsMember = true;

                    //Dispatch to add the new group to the store
                    this.$store.dispatch("joinGroup", { group: group })
                    this.checkIfUserIsMember();
                })
                .catch((err) => console.error(err));
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../../../resources/custom-variables.scss';
@import '../../../resources/custom-mixins.scss';

.group {

    &__header {
        margin-bottom: $default-spacing;

        &-actions {
            float: right;
        }
    }
}
</style>
