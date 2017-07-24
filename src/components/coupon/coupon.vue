<template>
    <div class="coupon">
        <div class="coupon__header">
            <span v-lang.coupon.totalProfit></span>
            <strong>{{totalProfit}},-</strong>
    
            <button class="coupon__trigger">+</button>
        </div>
    
        <div class="coupon__content">
             <div class="coupon__odds" v-for="item in selectedOdds">
                <span>
                    {{item.hometeam}}
                    <strong>vs</strong> {{item.awayteam}}
                </span>
                <div class="pull-right">
                    <span class="coupon__content-label">{{item.key}}</span>
                    <span class="coupon__content-returns">{{item.value}}</span>
                </div>
            </div> 
        </div>
    
        <div class="coupon__footer">
            <input type="text" name="amount" v-model="amount" />
            <span class="coupon__returns">* {{totalReturns}}</span>
            <button 
                :disabled="amount < amountMin || selectedOdds.length <= 0"
                v-on:click="saveCoupon()" 
                v-lang.generic.save>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "coupon",
    props: ["user", "group", "selectedOdds"],
    data() {
        return {
            title: "Coupon",
            amount: 0,
            amountMin: 10
        }
    },
    computed: {
        //Calculate the possible profit from the bet
        totalProfit: function () {
            let amount = this.amount >= 0 && this.amount !== "" ? this.amount : 0;
            let result = parseFloat(this.totalReturns) * parseFloat(amount);

            return result.toFixed(2);
        },

        //Calculate what all the odds combined will have as returns
        totalReturns: function () {
            let returns = 0;

            for (let i = 0; i < this.selectedOdds.length; i++) {
                let item = this.selectedOdds[i];
                let value = parseFloat(item.value);
                returns = parseFloat(returns) + value;
            }

            return returns.toFixed(2);
        },
    },
    methods: {
        couponAdded: function(){
            this.$emit('couponAdded');
            this.amount = 0;
        },
        saveCoupon: function () {
            let odds = [];

            //Gather all odds and push to new let.
            for (let i = 0; i < this.selectedOdds.length; i++) {
                let item = this.selectedOdds[i];

                odds.push(item);
            }

            //Create new coupon object
            let coupon = {
                UserId: this.user.User.Id,
                GroupId: this.group.Id,
                Amount: this.amount,
                TotalReturns: this.totalReturns
            };

            //Create new coupon object
            this.$http
                .get('user/CreateCoupon', {params: coupon})
                .then(response => {
                    let result = response.body;
                    this.user.Coupons.push(result); //push the new coupon to the current users coupons 
                    
                    console.log("Added a new coupon", result);

                    this.couponAdded();
                }, response => {
                    alert("error saving new coupon");
                });
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../../resources/custom-variables.scss';
@import '../../../resources/custom-mixins.scss';

.coupon {
    transform: translateX(-50%);
    position: fixed;
    bottom: 0;
    left: 50%;
    width: 400px;
    color: $white;
    background: $brand-primary;

    &__header {
        padding: $default-spacing/2;
    }

    &__trigger {
        position: absolute;
        top: 0;
        right: 0;
        color: $white;
        padding: $default-spacing/2 $default-spacing/1.5;
        background: $brand-primary-dark;
    }

    &__content {
        padding: $default-spacing/2;
    }

    &__footer {
        @include clearfix;
        padding: $default-spacing/2;

        input {
            padding: $default-spacing/3;
            border: 1px solid rgba(white, 0.3);
            background: transparent;
        }

        button {
            float: right;
            padding: $default-spacing/3;
            color: $white;
            background: $brand-primary-dark;
        }
    }
}
</style>
