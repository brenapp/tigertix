using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TigerTix.Api.Data.Models; 

public class ContentBlock {

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public ulong Id { get; set; }
    
    public string Title { get; set; }
    
    public string Content { get; set; }
    
}