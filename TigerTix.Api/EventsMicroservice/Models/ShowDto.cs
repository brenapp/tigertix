using NodaTime;

namespace EventsMicroservice.Models; 

public class ShowDto {
    
    public ulong VenueId { get; set; }
        
    public string Title { get; set; }
        
    public LocalDateTime Start { get; set; }
        
    public LocalDateTime End { get; set; }
        
    public double EntryPrice { get; set; }
        
    public uint Capacity { get; set; }
    
}