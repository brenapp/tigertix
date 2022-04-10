using TigerTix.Api.Data.Enums;

namespace TigerTix.Api.Data.Models; 

public class User {

    public ulong Id { get; set; }

    public string Token { get; set; }
    
    public string FirstName { get; set; }
    
    public string LastName { get; set; }
    
    public string Email { get; set; }

    public List<Show> Shows { get; set; } = new();

}