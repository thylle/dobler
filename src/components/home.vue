<template>
  <div>
      <groups :user="user"></groups>  
  </div>
</template>

<script>
import groups from './groups.vue'

export default {
  name: 'home',
  data() {
    return {
      title: ""
    }
  },
  props: ["user"],
  components: {
    groups
  }
}
</script>

