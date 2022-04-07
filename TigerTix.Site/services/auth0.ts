export async function connectUserManagement() {
    var request = require("request");

    var options = {
        url : "https://tigertix.us.auth0.com/oauth/token",
        headers : { 'content-type' : 'application/json'},
        body : {
            client_id : "ile0j3qCO7HEHefpd9QUqPyMpCRTaTwT",
            client_secret : "4jPZiFaO25wEOtayvXgAHWdg-PzGdEC8Abswchr4551RYUodSTKRHltrtmlOpvJj",
            audience : "https://tigertix.us.auth0.com/api/v2/",
            grant_type : "client_credentials"

        }
    }

    request(options, function(error : string, response : string, body : JSON) {
        if (error) throw new Error(error);

        var objResponse = JSON.parse(response);

        var token = response[0];
        console.log(token);

        return token;

    });
}