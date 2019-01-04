<template>
  <div>
    <catalog></catalog>

    <coupon></coupon>  
  </div>
</template>

<script>
import catalog from './catalog.vue'
import coupon from './coupon/coupon.vue'

export default {
  name: 'catalogPage',
  data() {
    return {
      title: "",
    }
  },
  components: {
    catalog,
    coupon
  }
}
</script>

