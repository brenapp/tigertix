using EventsMicroservice.Models;
using EventsMicroservice.Services;
using Microsoft.AspNetCore.Mvc;
using TigerTix.Api.Data.Enums;

namespace EventsMicroservice.Controllers; 

public class EventController : ControllerBase {

    private readonly EventService _service;

    public EventController(EventService service) {
        _service = service;
    }

    [HttpPost]
    [Route("create")]
    public async Task<IActionResult> Create([FromBody] ShowDto show) =>
        await _service.Create(show) switch {
            QueryStatus.Success => Ok(),
            QueryStatus.NotFound => NotFound($"A venue with the id \"{show.VenueId} does not exist."),
            _ => throw new InvalidOperationException()
        };

    [HttpDelete]
    [Route("delete")]
    public async Task<IActionResult> Delete(ulong id) =>
        await _service.Delete(id) switch {
            { Status: QueryStatus.Success } result => Ok(result.Value),
            { Status: QueryStatus.NotFound } => NotFound($"A show with the id \"{id}\" does not exist."),
            _ => throw new InvalidCastException()
        };

    [HttpGet]
    [Route("get")]
    public async Task<IActionResult> Get(ulong id) =>
        await _service.Get(id) switch {
            { Status: QueryStatus.Success } result => Ok(result.Value),
            { Status: QueryStatus.NotFound } => NotFound($"A show with the id \"{id}\" does not exist."),
            _ => throw new InvalidOperationException()
        };
}