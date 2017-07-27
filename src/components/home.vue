<template>
  <div>
    <groups></groups>  
  </div>
</template>

<script>
import groups from './group/groups.vue'

export default {
  name: 'home',
  data() {
    return {
      title: "",
    }
  },
  components: {
    groups
  }
}
</script>

