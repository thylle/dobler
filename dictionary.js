export function dictionary(locale) {
  return {
    default: locale,
    en: {
        //Generics - used across the whole app 
        generic: {
            login: "Login",
            logout: "Logout",
            loginDescription: "You can choose to login in with either Facebook or Google+",
            loginWithFacebook: "Login with Facebook",
            loginWithGoogle: "Login with Google+",
        },

        //Landingpage - What you see if you are not logged in...
        landingpage: {
            title: "Odds against your friends"
        }
        
    },
    da: {
        //Generics - used across the whole app 
        generic: {
            cancel: "Annuller",
            login: "Log ind",
            logout: "Log ud",
            loginDesc: "Du kan vælge at logge ind med Facebook eller Google+",
            loginWithFacebook: "Log ind med Facebook",
            loginWithGoogle: "Log ind med Google+",
        },

        //Landingpage - What you see if you are not logged in...
        landingpage: {
            title: "Odds mod dine venner"
        },

        group:{
            yourGroups: "Dine grupper",
            findGroup: "Find gruppe",
            findNewGroup: "Find en ny gruppe",
            changeGroup: "Skift gruppe",
            changeGroupDesc: "Vælg hvilken af dine grupper du vil se",
            maxNrOfGroups: "Du kan maksimalt være medlem af 3 grupper."
        }

        //Frontpage
    },
  }
}