<template>
  <div>
    {{getUsers}}

    <p><strong>In this group: </strong></p>
    <table class="table">
      <thead>
        <tr>
          <td>#</td>
          <td>Bruger</td>
          <td>Bank</td>
          <td>Runde</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in usersInGroup" :key="item.Id">
          <td>{{index+1}}</td>
          <td>{{item.Name}}</td>
          <td>{{calcDistanceToTop(item)}}</td>
          <td>....</td>
        </tr>
      </tbody>
    </table>
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
        .get('data/getUsersForGroup', { params: groupInfo })
        .then(response => {
          let data = response.body;
          console.log(data.length);
          if(data.length){
            data = data.sort((a, b) => b.Bank - a.Bank);
          }
          this.usersInGroup = data;
          console.log("users in this group", this.usersInGroup);
        })
        .catch((err) => console.error(err));
    }    
  },
  methods:{
    calcDistanceToTop(user){
      var topUser = this.usersInGroup[0];

      if(topUser.Id === user.Id){
        return user.Bank
      }
      else{
        return (user.Bank - topUser.Bank)
      }
    }
  }
}
</script>
