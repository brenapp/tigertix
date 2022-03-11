using Microsoft.AspNetCore.Mvc;

namespace RegistrationMicroservice.Controllers;

public class HelloWorldController : ControllerBase
{
    // GET
    [HttpGet]
    [Route("/api/[controller]")]
    public string Get()
    {
        return "Hello, world!";
    }
}