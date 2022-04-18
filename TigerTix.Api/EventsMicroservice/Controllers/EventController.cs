using EventsMicroservice.Models;
using EventsMicroservice.Services;
using Microsoft.AspNetCore.Mvc;
using TigerTix.Api.Data.Enums;

namespace EventsMicroservice.Controllers; 

public class EventController : ControllerBase {

    private readonly CreateEventService _service;

    public EventController(CreateEventService service) {
        _service = service;
    }

    [HttpPost]
    [Route("create")]
    public async Task<IActionResult> Create([FromBody] ShowDto show) =>
        await _service.Create(show) switch {
            { Status: QueryStatus.Success } result => Ok(),
            { Status: QueryStatus.Conflict } result => Conflict(result.Value),
            _ => throw new InvalidOperationException()
        };

    [HttpDelete]
    [Route("delete")]
    public IActionResult Delete([FromBody] ShowDto show) {
        return NoContent();
    }
}