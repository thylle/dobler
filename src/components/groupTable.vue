<template>
  <div>
    {{getUsers}}

    <p><strong>In this group: </strong></p>
    <p class="mb" v-for="item in usersInGroup">
      {{item.Name}}
    </p>
  </div>
</template>

<script>

export default {
  name: 'groupTable',
  data() {
    return{
      usersInGroup: null
    }
  },
  props: ["group"],
  computed:{
    getUsers: function(){

      let groupInfo = {
        groupId: parseInt(this.group.Id)
      }

      //Get users in this group
      this.$http
        .get('http://doblerapi.dev/api/user/getUsersForGroup', { params: groupInfo })
        .then(response => {
          this.usersInGroup = response.body;
          console.log("users in this group", this.usersInGroup);
        }, response => {
          console.log("error getting users for group");
        });
    }    
  }
}
</script>
