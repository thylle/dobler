


//Config file for global variables
export default {
    maxGroups: 3,
    apiUrl: "http://api.dobler.dev/api",
    authRedirectUri: process.env.NODE_ENV === "production" ? 'http://dobler.dev/' : 'http://localhost:8080/',
}

