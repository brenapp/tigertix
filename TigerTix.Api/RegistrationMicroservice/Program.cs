using Microsoft.EntityFrameworkCore;
using Npgsql;
using TigerTix.Api.Data.Contexts;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// **************** CONFIGURE DB CONN STRING **********
builder.Host.ConfigureAppConfiguration((_, config) => {
    config.AddUserSecrets<TigerTixContext>(false);
    config.AddEnvironmentVariables();
});

var connStr = builder.Configuration["TigerTixConnectionString"];
// ****************************************************

// **************** CONFIGURE DB CONTEXT **************
builder.Services.AddDbContext<TigerTixContext>(
    options => options.UseNpgsql(connStr, optionsBuilder => optionsBuilder.UseNodaTime()));
// ****************************************************

var app = builder.Build();

// **************** CONFIGURE EF CTX SCOPE ************
using var scope = app.Services.CreateScope();
var ctx = scope.ServiceProvider.GetRequiredService<TigerTixContext>();
// ****************************************************

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// **************** APPLY DB MIGRATIONS ***************
ctx.Database.Migrate();
using var conn = (NpgsqlConnection) ctx.Database.GetDbConnection();
conn.Open();
conn.ReloadTypes();
// ****************************************************

app.Run();