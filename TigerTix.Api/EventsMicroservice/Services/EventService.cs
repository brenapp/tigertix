using EventsMicroservice.Models;
using TigerTix.Api.Data.Contexts;
using TigerTix.Api.Data.Enums;
using TigerTix.Api.Data.Models;
using TigerTix.Api.Data.Utilities;

namespace EventsMicroservice.Services; 

public class EventService {

    private readonly TigerTixContext _ctx;
    
    public EventService(TigerTixContext ctx) {
        _ctx = ctx;
    }

    public async Task<QueryStatus> Create(ShowDto dto) {
        var venue = await _ctx.Venues.FindAsync(dto.VenueId);
        if (venue is null)
            return QueryStatus.NotFound;
        await _ctx.Shows.AddAsync(new Show {
            VenueId = dto.VenueId,
            Venue = venue,
            Title = dto.Title,
            Description = dto.Description,
            Start = dto.Start,
            End = dto.End,
            EntryPrice = dto.EntryPrice,
            Capacity = dto.Capacity
        });
        await _ctx.SaveChangesAsync();
        return QueryStatus.Success;
    }

    public async Task<IQueryResult<Show>> Get(ulong id) {
        var show = await _ctx.Shows.FindAsync(id);
        return show is null ? QueryResult<Show>.NotFound() : QueryResult<Show>.Success(show);
    }

    public async Task<IQueryResult<Show>> Delete(ulong id) {
        var show = await _ctx.Shows.FindAsync(id);
        if (show is null)
            return QueryResult<Show>.NotFound();
        _ctx.Shows.Remove(show);
        await _ctx.SaveChangesAsync();
        return QueryResult<Show>.Success(show);
    }
}