using EventsMicroservice.Controllers;
using EventsMicroservice.Models;
using Microsoft.AspNetCore.Mvc;
using TigerTix.Api.Data.Contexts;
using TigerTix.Api.Data.Enums;
using TigerTix.Api.Data.Models;
using TigerTix.Api.Data.Utilities;

namespace EventsMicroservice.Services; 

public class CreateEventService {

    private readonly TigerTixContext _ctx;
    
    public CreateEventService(TigerTixContext ctx) {
        _ctx = ctx;
    }

    public async Task<IQueryResult<string>> Create(ShowDto dto) {
        var venue = await _ctx.Venues.FindAsync(dto.VenueId);
        if (venue is null)
            return QueryResult<string>.Conflict("Venue does not exist.");
        await _ctx.Shows.AddAsync(new Show {
            VenueId = dto.VenueId,
            Venue = venue,
            Title = dto.Title,
            Start = dto.Start,
            End = dto.End,
            EntryPrice = dto.EntryPrice,
            Capacity = dto.Capacity
        });
        await _ctx.SaveChangesAsync();
        return QueryResult<string>.Success(null);
    }
}