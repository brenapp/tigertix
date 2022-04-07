using RestSharp;
using TinyJson;


public class Auth0Controller {
    public async Task<string> receiveAuth0Token() {
        var client = new RestClient("https://tigertix.us.auth0.com/oauth/token");
        var request = new RestRequest();
        request.Method = Method.Post;
        request.AddHeader("content-type", "application/json");
        request.AddJsonBody(new {
            client_id = "ile0j3qCO7HEHefpd9QUqPyMpCRTaTwT",
            client_secret = "4jPZiFaO25wEOtayvXgAHWdg-PzGdEC8Abswchr4551RYUodSTKRHltrtmlOpvJj",
            audience = "https://tigertix.us.auth0.com/api/v2/",
            grant_type = "client_credentials"
        });

        var response = await client.ExecuteAsync(request);

        Console.WriteLine(response.Content);

        var test = response.Content.FromJson<object>();
        Dictionary<string, object> response1 = ((Dictionary<string, object>)(test));

        string token = (string)response1["access_token"];
        Console.WriteLine(token);

        return token;
        
    }
    
    public async void runAPICall(string token) {
         var client = new RestClient("https://tigertix.us.auth0.com/api/v2/users/auth0|6229745379736a0070434546");
        var request = new RestRequest();
        request.Method = Method.Patch;
        request.AddJsonBody(new {
            app_metadata = new {
                role = "Attendee"
            }
        });
    
        request.AddHeader("authorization", "Bearer " + token);
        var response = await client.ExecuteAsync(request);
        Console.WriteLine("User Data" + response.Content);

    }


};


