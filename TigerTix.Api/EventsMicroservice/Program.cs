/**
 * @author Brendan McGuire, Justin Kristensen, JT Fleetwood
 * @date 16 March 2022
 * 
 * Events Microsevice
 * 
 **/

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/list", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new Event("Tigertown Throwdown", new DateTime(), "Hendrix Student Center", "RE-VRC-21-4756")
    )
    .ToArray();

    return forecast;
})
.WithName("GetEventsList");

app.MapGet("/", () => "Hello World");

app.Run();

record Event(string name, DateTime start, string venue, string sku) {

};