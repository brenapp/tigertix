namespace TigerTix.Api.Data.Models; 

public class Venue {
    
    public ulong Id { get; set; }
    
    public string Name { get; set; }
    
    public string Address { get; set; }
    
    public uint MaxCapacity { get; set; }
    
    public List<Show> Shows { get; set; }
    
    public ulong OwnerId { get; set; }
    public User Owner { get; set; }
    
}