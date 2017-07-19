<template>
  <div>
      <groups :user="user" :selectedOdds="selectedOdds"></groups>  
      
      <coupon :user="user.User" :selectedOdds="selectedOdds"></coupon>
  </div>
</template>

<script>
import coupon from './coupon.vue'
import groups from './groups.vue'

export default {
  name: 'home',
  data() {
    return {
      title: ""
    }
  },
  props: ["user", "selectedOdds"],
  components: {
    coupon,
    groups
  }
}
</script>

