<template>
  <div v-if="currentUser.length">
    <h1>Store</h1>

    <div class="boxed">
      <p><strong>User: </strong></p>
      <p>{{currentUser.User}}</p>
    </div>
    
    <div class="boxed">
      <p><strong>User Coupons: </strong> {{currentUser.Coupons.length}}</p>
    </div>

    <div class="boxed">
      <p><strong>User Groups:</strong></p>
      <table class="table">
        <tr>
          <th>Id</th>
          <th>AdminId</th>
          <th>Name</th>
          <th>Private</th>
          <th>Bank</th>
          <th>Coupons</th>
        </tr>
        <tr v-for="item in currentUser.Groups">
          <td>{{item.Id}}</td>
          <td>{{item.AdminId}}</td>
          <td>{{item.Name}}</td>
          <td>{{item.Private}}</td>
          <td>{{item.Bank}}</td>
          <td>{{item.Coupons.length}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>

export default {
  name: 'test',
  data() {
    return {
      title: "test",
    }
  },
  computed:{
    currentUser(){
      return this.$store.state.user;
    }
  }
}
</script>

