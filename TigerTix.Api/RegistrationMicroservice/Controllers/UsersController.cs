using Microsoft.AspNetCore.Mvc;

namespace RegistrationMicroservice.Controllers; 

public class UsersController : ControllerBase {

    public class UserDto {

        public string FirstName { get; set; }

    }
    
}