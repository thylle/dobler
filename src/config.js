


//Config file for global variables
export default {
    apiUrl: "http://api.dobler.dev/api",
    authRedirectUri: process.env.NODE_ENV === "production" ? 'http://dobler.dev/' : 'http://localhost:8080/',
}

