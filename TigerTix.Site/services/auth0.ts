/**
 * Client Side Auth0 Actions
 **/

const client_id = "ile0j3qCO7HEHefpd9QUqPyMpCRTaTwT"


/**
 * Initiates a password reset link
 * @param email User email
 * @returns Request send
 **/
export async function initiatePasswordReset(email: string) {

    return fetch("https://tigertix.us.auth0.com/dbconnections/change_password", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
            client_id,
            email,
            connection: "Username-Password-Authentication"
        })
    }
    );
};
