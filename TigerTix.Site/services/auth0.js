import axios from "axios";

import { resolve } from "path";

export async function connectUserManagement() {
    var request = require("request");
    var token_message;

    var options = { method: 'POST',
      url: 'https://tigertix.us.auth0.com/oauth/token',
      headers: { 'content-type': 'application/json' },
      body: '{"client_id":"ile0j3qCO7HEHefpd9QUqPyMpCRTaTwT","client_secret":"4jPZiFaO25wEOtayvXgAHWdg-PzGdEC8Abswchr4551RYUodSTKRHltrtmlOpvJj","audience":"https://tigertix.us.auth0.com/api/v2/","grant_type":"client_credentials"}' };
    

      return new Promise(function(resolve, reject) {
        request(options, function (error, response, body) {
        
            if (error) throw new Error(error)
            
            token_message = JSON.parse(body);

            resolve(token_message);
            
            
        })
    });

    

    
    

    
}

export async function changePassword(token, user, newPass) {
    console.log(user.sub);
    var options = {
        method : 'PATCH',
        url : 'https://tigertix.us.auth0.com/api/v2/users/' + user.sub,
        headers : {'content-type' : 'application/json', authorization : "Bearer " + token},
        data : {password : newPass, connection : 'Username-Password-Authentication'}
    };

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}