using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TigerTix.Api.Data.Models; 

public class Venue {
    
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public ulong Id { get; set; }
    
    public string Name { get; set; }
    
    public string Address { get; set; }
    
    public uint MaxCapacity { get; set; }
    
    public List<Show> Shows { get; set; }
    
    public ulong OwnerId { get; set; }
    public User Owner { get; set; }
    
}