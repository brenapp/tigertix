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
    var forecast = Enumerable.Range(1, 5).Select(index => {

        ContentBlock[] blocks = {
            new ContentBlock("Health & Safety Policy", "Be safe out there!"),
            new ContentBlock("Refund Policy", "No refunds")
        };

        return new Event(37474, "The Scrum Kings' Karaoke Night", DateTime.Now, DateTime.Now, 
                        100, 100, 5.00, "The Scrum Kings perform several songs by Billie Eilish.", 
                        "https://imgur.com/ehe.png", "https://imgur.com/ehe.png", "Barnes Center", 
                        383838, "Cherry Rd, Clemson, SC 29631",  blocks);

    }).ToArray();

    return forecast;
})
.WithName("GetEventsList");

app.MapGet("/", () => "Go to /list for list of events");

app.Run();

record ContentBlock(string title, string description) { };
record Event(int id, string title, DateTime start, DateTime end, int capacity_total, int capacity_remaining,
            double registration_price, string description, string image_hero, string image_thumbnail,
            string venue_description, int venue_id, string venue_address, ContentBlock[] blocks)
{ };