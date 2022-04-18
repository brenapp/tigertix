using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using TigerTix.Api.Data.Enums;

namespace TigerTix.Api.Data.Models; 

[Index(nameof(ShowId))]
public class ShowAssociate {

    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.None)]
    public ulong Id { get; set; }
    
    public ulong ShowId { get; set; }
    public Show Show { get; set; }
    
    public ulong UserId { get; set; }
    public User User { get; set; }

    public Role Role { get; set; } = Role.User;

}