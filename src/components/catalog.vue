<template>
  <div class='catalog'>
    <h2 class='catalog__title'>{{title}}</h2>

    <div class='catalog__items'>
      <div class="catalog__items-header">
        <h3 class="catalog__items-title">Premier League</h3>
        <small>20. januar 2010</small>
      </div>
      <div class='catalog__item' v-for="item in games">
        <div class="catalog__header">
          <!--Teams-->
          <div class="catalog__column  catalog__column--teams">
            {{item.match_hometeam_name}}
            <br/> {{item.match_awayteam_name}}
          </div>
  
          <!--Quick Odds-->
          <div class="catalog__column  catalog__column--quick-odds">
            <button v-for="quickodds in item.odds.quickodds[0].odds" v-on:click="toggleOdds(item, quickodds)" v-bind:class="{selected: quickodds.selected}" :disabled="item.selected && !quickodds.selected">
              <span>{{quickodds.key}}</span>
              <span>{{quickodds.value}}</span>
            </button>
          </div>
  
          <!--CTA-->
          <div class="catalog__column  catalog__column--cta">
            <button v-on:click="item.open = !item.open" v-bind:class="{active: item.open}">
              <span v-if="!item.open">Se flere</span>
              <span v-if="item.open">Se færre</span>
            </button>
          </div>
        </div>
  
        <!--CONTENT-->
        <div class="catalog__content" v-if="item.open">
          <div class="catalog__content-item" v-for="catalogItem in item.odds.catalog" v-bind:class="['catalog__content--' + catalogItem.alias]">
            <p class="catalog__content-title">{{catalogItem.name}}</p>
            <div class="catalog__content-buttons">
              <button v-for="catalogOdds in catalogItem.odds" v-on:click="toggleOdds(item, catalogOdds)" v-bind:class="{selected: catalogOdds.selected}" :disabled="item.selected && !catalogOdds.selected">
                <span>{{catalogOdds.key}}</span>
                <span>{{catalogOdds.value}}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import helpers from '../helpers.js';

export default {
  name: 'catalog',
  props: ['selectedOdds'],
  data() {
    return {
      title: 'Odds katalog',
      games: [
      { "match_id": "175808", "selected": false, "open": false, "country_id": "169", "country_name": "England", "league_id": "62", "league_name": "Premier League", "match_date": "2017-05-06", "match_status": "FT", "match_time": "13:30", "match_hometeam_name": "Manchester City", "match_hometeam_score": "5", "match_awayteam_name": "Crystal Palace", "match_awayteam_score": "0", "match_live": "1", "goalscorer": [] }, 
      { "match_id": "175809", "selected": false, "open": false, "country_id": "169", "country_name": "England", "league_id": "62", "league_name": "Premier League", "match_date": "2017-05-06", "match_status": "FT", "match_time": "16:00", "match_hometeam_name": "AFC Bournemouth", "match_hometeam_score": "2", "match_awayteam_name": "Stoke City", "match_awayteam_score": "2", "match_live": "1", "goalscorer": [] }, 
      { "match_id": "175810", "selected": false, "open": false,"country_id": "169", "country_name": "England", "league_id": "62", "league_name": "Premier League", "match_date": "2017-05-06", "match_status": "FT", "match_time": "16:00", "match_hometeam_name": "Burnley", "match_hometeam_score": "2", "match_awayteam_name": "West Bromwich Albion", "match_awayteam_score": "2", "match_live": "1", "goalscorer": [] }, 
      { "match_id": "175811", "selected": false, "open": false,"country_id": "169", "country_name": "England", "league_id": "62", "league_name": "Premier League", "match_date": "2017-05-06", "match_status": "FT", "match_time": "16:00", "match_hometeam_name": "Hull City", "match_hometeam_score": "0", "match_awayteam_name": "Sunderland", "match_awayteam_score": "2", "match_live": "1", "goalscorer": [] }, 
      { "match_id": "175812", "selected": false, "open": false,"country_id": "169", "country_name": "England", "league_id": "62", "league_name": "Premier League", "match_date": "2017-05-06", "match_status": "FT", "match_time": "16:00", "match_hometeam_name": "Leicester City", "match_hometeam_score": "3", "match_awayteam_name": "Watford", "match_awayteam_score": "0", "match_live": "1", "goalscorer": [] }, 
      { "match_id": "175813", "selected": false, "open": false,"country_id": "169", "country_name": "England", "league_id": "62", "league_name": "Premier League", "match_date": "2017-05-06", "match_status": "FT", "match_time": "18:30", "match_hometeam_name": "Swansea City", "match_hometeam_score": "1", "match_awayteam_name": "Everton", "match_awayteam_score": "0", "match_live": "1", "goalscorer": [] }]
    }
  },
  created: function () {
    //Loop through games and add a custom generated odds array
    for (let i = 0; i < this.games.length; i++) {
      let game = this.games[i];
      let matchId = game.match_id;

      game.odds = helpers.createCustomOddsArray(matchId);
    }
  },

  methods: {
    resetCatalog(){
      for(let game in games){
        item.selected = false;
        item.open = false;
      }
    },

    //Method for odds buttons in the catalog to add odds to the "selectedOdds" and update the coupon.
    toggleOdds (item, odds) {
      item.selected = !item.selected;
      odds.selected = !odds.selected;

      let pushNewOdds = true;
      let matchId = item.match_id;
      let alias = odds.alias;
      let hometeam = item.match_hometeam_name;
      let awayteam = item.match_awayteam_name;

      //Check if matchId is in our selectedOdds array - if yes, then we remove the odds (toggle)
      for (var i = 0; i < this.selectedOdds.length; i++) {
        var element = this.selectedOdds[i];

        if(element.matchId == matchId){
          pushNewOdds = false;
          this.selectedOdds.splice(i,1);
        }
      }
    
      //Push new odds to selectedOdds
      if(pushNewOdds){
        this.selectedOdds.push({matchId, alias, hometeam, awayteam, key: odds.key, value: odds.value});
      }

      console.log("selected", this.selectedOdds);
    }
  }  
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style lang='scss' scoped>
@import '../../resources/custom-variables.scss';
@import '../../resources/custom-mixins.scss';

.catalog {

  button {
    display: block;
    float: left;
    margin: 0 $default-spacing/4;

    span {
      display: block;
    }
  }

  &__title {
    margin: 0;
    padding: $default-spacing/2;
    font-size: $font-size-h5;
    background: $gray-light;
  }

  &__header {
    display: flex;
    padding: $default-spacing/2 0;
    border-bottom: 1px solid $gray-light;
  }

  &__items{
    &-header{
      padding: $default-spacing/2 0;
      border-bottom: 3px solid $gray-light;
    }

    &-title{
      margin: 0;
    }

  }

  &__item

  &__column {
    &:first-child {
      flex-grow: 1;
      width: 60%;
    }

    &--quick-odds {
      width: 30%;
      min-width: 210px;
    }

    &--cta{
      width: 10%;
      min-width: 90px;

      button{
        width: 100%;
        margin: 0;
        overflow: hidden;

        &.active{

          &:after{
            transform: rotate(135deg);
          }
        }

        &:after{
          @include transition-std(transform);
          @include icon-plus;
          display: block;
        }
      }
    }
  }

  &__content {
    @include clearfix;
    width: 100%;
    border: 1px solid $gray-light;

    &-item{
      @include clearfix;
    }

    &-title {
      margin: 0 0 $default-spacing/2;
      padding: $default-spacing/2;
      font-weight: bold;
      background: $gray-light;
    }

    &-buttons{
      @include clearfix;
      margin-bottom: $default-spacing/2;
      
      button{
        width: 48%;
        margin: 0 1%;
        margin-bottom: $default-spacing/2;
      }
    }

  }
}
</style>
