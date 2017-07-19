<template>
  <div class="coupon-item" tabindex="0" v-bind:class="{'won' : coupon.Won, 'done' : coupon.Done}">

    <!-- Header -->
    <div class="coupon-item__header">
      <span>uge {{coupon.Created | moment("w")}} </span>
      <span class="coupon-item__header-icon" aria-hidden="true"></span>
    </div>

    <!-- Content -->
    <div class="coupon-item__content">
      <div class="coupon-item__row">
        <span>MUN vs ARS</span>
        <span>1</span>
        <span>1.75</span>
      </div>
      <div class="coupon-item__row">
        <span>EVE vs TOT</span>
        <span>x</span>
        <span>3.75</span>
      </div>
    </div>

    <!-- Footer -->
    <div class="coupon-item__footer">
      <div class="coupon-item__row">
        <span>Indskud: </span>
        <span>{{coupon.Amount}}</span>
      </div>
      <div class="coupon-item__row">
        <span>??Retur??: </span>
        <span>{{coupon.TotalReturns}}</span>
      </div>

      <div class="coupon-item__row  coupon-item__row--highlight">
        <span>Samlet gevinst: </span>
        <span>{{totalProfit}}</span>
      </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'couponItem',
  props: ["coupon"],
  computed:{
    totalProfit: function(){
      
      //If the coupon is a winner, return the profit
      if(this.coupon.Won){
        return (this.coupon.Amount * this.coupon.TotalReturns)
      }
      
      return 0;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../resources/_custom-variables.scss";
@import "../../resources/_custom-mixins.scss";

.coupon-item{
  margin-bottom: $default-spacing/2;
  font-size: $font-size-small;
  background: $gray-light;

  &.done{
    opacity: 0.6;

    &:hover,
    &:focus{
      opacity: 1;
    }
  }

  &.won{
    .coupon-item__header{
      background: $brand-primary;

      &-icon:before{
        @include icon-done;
      }
    }
  }

  &__header{
    display: flex;
    justify-content: space-between;
    padding: $default-spacing/2;
    text-transform: uppercase;
    color: $white;
    background: $brand-error;

    &-icon{
      &:before{
        @include icon-cross;
      }
    }
  }

  &__content{
    padding: $default-spacing/2;
  }

  &__row{
    display: flex;
    justify-content: space-between;

    &--highlight{
      font-weight: bold;
    }

  }

  &__footer{
    padding: $default-spacing/2;
    border-top: 1px solid $gray;    
  }
}
</style>
