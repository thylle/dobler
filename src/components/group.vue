<template>
    <div class="group">
        <template v-if="group">
            <div class="group__header  clearfix">
                <h1 class="pull-left">{{group.Name}}</h1> 
                <button class="btn pull-right" @click="showModal = true">Skift gruppe</button>
            </div>
            <div class="row">
                <div class="col-xs-12 col-sm-8">
                    <catalog :selectedOdds="selectedOdds"></catalog>
                </div>
                <div class="col-xs-12 col-sm-4">
                    <groupTable :group="group"></groupTable>
                </div>
            </div>

            <!-- The coupon -->
            <coupon :user="user.User" :selectedOdds="selectedOdds"></coupon>

            <!-- Modal popup to change group -->
            <modal v-if="showModal" @close="showModal = false">
                <p slot="header">Skift gruppe</p>
                <div slot="body">
                    <p>Vælg hvilken af dine grupper du vil se</p>
            
                    <router-link class="groups__link btn" 
                        v-if="item.Id !== group.Id"
                        :to="{path: '/' + item.Name + '/' + item.Id, params: {name: item.Name, id: item.Id}}" 
                        :user="user"
                        :selectedOdds="selectedOdds"
                        v-for="item in user.Groups" 
                        :key="item.Id">

                        <span class="groups__name">{{item.Name}}</span>
                    </router-link>

                    <!-- If the user is only member of 1-2 groups - show a "find group" button -->
                    <template v-if="user.Groups.length < 3">
                        <router-link class="groups__link btn btn-primary mt1"
                            :to="'#'">
                            <span class="groups__name">Find en ny gruppe</span>
                        </router-link>
                    </template>

                    <template v-if="user.Groups.length == 3">
                        <small>Du kan maksimalt være medlem af 3 grupper.</small>
                    </template>
                    
                </div>
            </modal>
        </template>
         

        <template v-if="!group">
            <h1>No group found</h1> 
        </template>
    </div>
</template>

<script>
import coupon from './coupon.vue'
import catalog from './catalog.vue'
import modal from './modal.vue'
import groupTable from './groupTable.vue'

export default {
    name: 'group',
    data() {
        return {
            group: null,
            showModal: false
        }
    },
    props: ["user", "selectedOdds"],
    components: {
        coupon,
        catalog,
        modal,
        groupTable
    },
    created() {
        this.getGroupData(this.$route.params.id);
    },
    beforeRouteUpdate (to, from, next) {
        setTimeout(() =>{
            this.getGroupData(to.params.id);
            this.showModal = false;    
            next();
        }, 300);
    },

    methods: {
        getGroupData: function(id){
            var groupId = parseInt(id);

            //Get the users group that matches the id from the URL.
            for (let i = 0; i < this.user.Groups.length; i++) {
                let item = this.user.Groups[i];

                if(item.Id === groupId){
                    console.log("group", item);
                    this.group = item;
                    return;
                }
            } 
            return;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../resources/custom-variables.scss';
@import '../../resources/custom-mixins.scss';

.group {

    &__header{
    }
}
</style>
