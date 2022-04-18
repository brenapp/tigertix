using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.Extensions.Configuration;

namespace TigerTix.Api.Data.Contexts; 

public class TigerTixContextFactory : IDesignTimeDbContextFactory<TigerTixContext> {
    
    public TigerTixContext CreateDbContext(string[] args) {
        var config = new ConfigurationBuilder()
            .AddUserSecrets<TigerTixContext>()
            .Build();
        var builder = new DbContextOptionsBuilder<TigerTixContext>();
        builder.UseNpgsql(config["TigerTixConnectionString"], options => options.UseNodaTime());
        return new TigerTixContext(builder.Options);
    }
}