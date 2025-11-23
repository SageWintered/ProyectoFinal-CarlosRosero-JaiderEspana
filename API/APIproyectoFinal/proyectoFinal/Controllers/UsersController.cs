using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
  [HttpGet]
  public IActionResult GetUsers()
  {
    return Ok(new string[] { "Carlos", "Juan", "Ana", "Hola" });
  }

  [HttpPost]
  public IActionResult CreateUser([FromBody] string user)
  {
    return Ok($"Usuario {user} creado");
  }
}
