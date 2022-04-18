using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using NodaTime;

namespace TigerTix.Api.Data.Models; 

public class Show {

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public ulong Id { get; set; }
    
    public ulong VenueId { get; set; }
    public Venue Venue { get; set; }
    
    public string Title { get; set; }
    
    public string Description { get; set; }
    
    public LocalDateTime Start { get; set; }
    
    public LocalDateTime End { get; set; }

    public string? ImageHero { get; set; }

    public string? ImageThumbnail { get; set; }
    
    public double EntryPrice { get; set; }

    public uint Capacity { get; set; }
    
    public List<ContentBlock> ContentBlocks { get; } = new();

    public List<User> Users { get; } = new();

}