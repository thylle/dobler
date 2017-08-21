//Odds type: 1x2
function quickOdds(odds){
    let result = [];
    let one = odds.odd_1;
    let x = odds.odd_x;
    let two = odds.odd_2;

    if(one && x && two){
        result.push(
            {key: "1", value: one, selected: false, alias: "quick"},
            {key: "x", value: x, selected: false, alias: "quick"},
            {key: "2", value: two, selected: false, alias: "quick"}
        );
    }

    return result;
}

//Odds type: Both Teams Scores
function bothTeamsScoreOdds(odds){
    let result = [];
    let bts_yes = odds.bts_yes;
    let bts_no = odds.bts_no;

    if(bts_yes && bts_no){
        result.push(
            {key: "Ja", value: bts_yes, selected: false, alias: "bts"},
            {key: "Nej", value: bts_no, selected: false, alias: "bts"}
        );
    }

    return result;
}

//Odds type: Over / Under
function overUnderOdds(odds){
    let result = []
    let o_1_5 = odds["o+1.5"];
    let o_2_5 = odds["o+2.5"];
    let o_3_5 = odds["o+3.5"];
    let u_1_5 = odds["u+1.5"];
    let u_2_5 = odds["u+2.5"];
    let u_3_5 = odds["u+3.5"];
    
    //Over/Under
    if(o_1_5){
        result.push({key: "Over 1.5", value: o_1_5, selected: false, alias: "ou"});
    }
    if(u_1_5){
        result.push({key: "Under 1.5", value: u_1_5, selected: false, alias: "ou"});
    }
    //2.5
    if(o_2_5){
        result.push({key: "Over 2.5", value: o_2_5, selected: false, alias: "ou"});
    }
    if(u_2_5){
        result.push({key: "Under 2.5", value: u_2_5, selected: false, alias: "ou"});
    }
    //3.5
    if(o_3_5){
        result.push({key: "Over 3.5", value: o_3_5, selected: false, alias: "ou"});
    }
    if(u_3_5){
        result.push({key: "Under 3.5", value: u_3_5, selected: false, alias: "ou"});
    }

    return result;
}


//Import global config
import config from './config';


//Helpers is some functions that we re-use different places through the app.
export default {
    //Check if the current user has reached his maximum number of groups.
    maxGroupsReached: (user) => {
        //If user is empty
        if(Object.keys(user).length === 0 && user.constructor === Object){
            return false
        }
        return user.Groups.length >= config.maxGroups
    },

    //Create custom odds array for our odds program catalog
    createCustomOddsArray: (matchId) => {
        var customOddsArray = [];
        customOddsArray.quickodds = [];
        customOddsArray.catalog = [];

        //Get Odds
        const result = [{ 'match_id': '175809', 'odd_bookmakers': 'bet365', 'odd_date': '2017-05-06 20:48:16', 'odd_1': '2.30', 'odd_x': '3.50', 'odd_2': '3.25', 'ah-4.5_1': '', 'ah-4.5_2': '', 'ah-4_1': '', 'ah-4_2': '', 'ah-3.5_1': '', 'ah-3.5_2': '', 'ah-3_1': '', 'ah-3_2': '', 'ah-2.5_1': '', 'ah-2.5_2': '', 'ah-2_1': '', 'ah-2_2': '', 'ah-1.5_1': '', 'ah-1.5_2': '', 'ah-1_1': '', 'ah-1_2': '', 'ah0_1': '', 'ah0_2': '', 'ah+0.5_1': '', 'ah+1_1': '', 'ah+1_2': '', 'ah+1.5_1': '', 'ah+1.5_2': '', 'ah+2_1': '', 'ah+2_2': '', 'ah+2.5_1': '', 'ah+2.5_2': '', 'ah+3_1': '', 'ah+3_2': '', 'ah+3.5_1': '', 'ah+3.5_2': '', 'ah+4_1': '', 'ah+4_2': '', 'ah+4.5_1': '', 'ah+4.5_2': '', 'o+0.5': '1.05', 'u+0.5': '12.00', 'o+1': '', 'u+1': '', 'o+1.5': '1.22', 'u+1.5': '4.00', 'o+2': '', 'u+2': '', 'o+2.5': '1.80', 'u+2.5': '2.00', 'o+3': '', 'u+3': '', 'o+3.5': '2.75', 'u+3.5': '1.40', 'o+4': '', 'u+4': '', 'o+4.5': '5.50', 'u+4.5': '1.14', 'o+5': '', 'u+5': '', 'o+5.5': '11.00', 'u+5.5': '1.05', 'bts_yes': '1.62', 'bts_no': '2.20' }];

        if(result.length){
            let quick = []; 
            let bts = []; 
            let ou = [];

            result.map(function (item){
                //Odds type: 1x2
                quick = quickOdds(item);
                
                //Odds type: Both Teams Scores
                bts = bothTeamsScoreOdds(item);

                //Odds type: Over / Under
                ou = overUnderOdds(item);
            });

            if(quick.length){
                customOddsArray.quickodds.push({alias: "quick", name: "1 x 2", odds: quick});
            }

            if(bts.length){
                customOddsArray.catalog.push({alias: "bts", name: "Begge hold scorer", odds: bts});
            }

            if(ou.length){
                customOddsArray.catalog.push({alias: "ou", name: "Over / Under i mål", odds: ou});
            }

            //console.log("customOddsArray created, matchId: " + matchId, customOddsArray);

            return customOddsArray;
        }
        
    }
}