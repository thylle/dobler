<template>
  <div>
    <h1>find groups...</h1>
  
    <div class="groups-overview ">
      <router-link class="group-list-item  align-vertically" v-for="item in groups" :key="item.Id" :to="createGroupRoute(item)">
        <span>
          {{item.Name}}
        </span>
  
        <div class="align-vertically">
          <small v-if="item.UserIsMember" v-lang.group.userIsMemberDesc></small>
          <span class="icon icon-lock_outline  ml" v-if="item.Private"></span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>

export default {
  name: 'groupsOverview',
  data() {
    return {
      user: this.$store.getters.user
    }
  },
  created() {
    this.$store.dispatch("getAllGroups")
  },
  computed: {
    groups() {
      return this.$store.getters.groups
    },
  },
  methods: {
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
