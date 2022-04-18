using Microsoft.EntityFrameworkCore;
using TigerTix.Api.Data.Enums;
using TigerTix.Api.Data.Models;

namespace TigerTix.Api.Data.Contexts; 

public class TigerTixContext : DbContext {

    public TigerTixContext(DbContextOptions<TigerTixContext> ctx) : base(ctx) {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Show> Shows { get; set; }
    public DbSet<Venue> Venues { get; set; }
    public DbSet<ShowAssociate> Associates { get; set; }
    public DbSet<ContentBlock> ContentBlocks { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        modelBuilder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();
        modelBuilder.Entity<Venue>()
            .HasMany(v => v.Shows);
        modelBuilder.Entity<Show>()
            .HasMany(s => s.Users)
            .WithMany(u => u.Shows);
        modelBuilder.Entity<Show>()
            .HasMany(s => s.ContentBlocks);
        modelBuilder.Entity<ShowAssociate>()
            .Property(s => s.Role)
            .HasConversion<ushort>();
    }
}