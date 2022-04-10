using NodaTime;
using TigerTix.Api.Data.Enums;

namespace TigerTix.Api.Data.Models; 

public class Show {

    public ulong Id { get; set; }
    
    public ulong VenueId { get; set; }
    public Venue Venue { get; set; }
    
    public string Title { get; set; }
    
    public string Description { get; set; }
    
    public LocalDateTime Start { get; set; }
    
    public LocalDateTime End { get; set; }
    
    public string ImageHero { get; set; }
    
    public string ImageThumbnail { get; set; }
    
    public decimal EntryPrice { get; set; }

    public uint Capacity { get; set; }
    
    public List<ContentBlock> ContentBlocks { get; } = new();

    public List<User> Users { get; set; }

}