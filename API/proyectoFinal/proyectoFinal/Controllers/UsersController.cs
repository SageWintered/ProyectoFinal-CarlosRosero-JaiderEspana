using Dapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;

namespace proyectoFinal.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class UsersController : ControllerBase
  {
    private readonly string _connectionString = "Server=CARLOS\\MSSQLSERVER2;Database=bdProyecto;User Id=carlos;Password=110206;TrustServerCertificate=true";

    [HttpGet("login")]
    public IActionResult Login([FromQuery] string username, [FromQuery] string password)
    {
      using var connection = new SqlConnection(_connectionString);

      string sql = "SELECT * FROM usuarios WHERE username = @username AND password = @password";

      var user = connection.QueryFirstOrDefault(sql, new { username, password });

      if (user == null)
        return NotFound(new { message = "Usuario o contraseña incorrectos" });

      return Ok(user);
    }

    [HttpPost]
    public IActionResult CreateUser(User user)
    {
      using var connection = new SqlConnection(_connectionString);

      string sqlCheckUser = "SELECT COUNT(*) FROM usuarios WHERE username = @Username";
      int exists = connection.ExecuteScalar<int>(sqlCheckUser, new { user.Username });

      if (exists > 0)
      {
        return BadRequest(new { message = "El nombre de usuario ya está registrado" });
      }

      string sqlNextId = "SELECT ISNULL(MAX(id), 0) + 1 FROM usuarios";
      int nextId = connection.ExecuteScalar<int>(sqlNextId);

      string sqlInsert = @"INSERT INTO usuarios (Id, username, password, email, rol)
                         VALUES (@Id, @Username, @Password, @Email, @Rol)";

      connection.Execute(sqlInsert, new
      {
        Id = nextId,
        user.Username,
        user.Password,
        user.Email,
        user.Rol
      });

      return Ok(new { message = "Usuario registrado", id = nextId });
    }



  }
}
