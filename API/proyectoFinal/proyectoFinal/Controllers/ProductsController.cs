using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Dapper;
using proyectoFinal.Models;

namespace proyectoFinal.Controllers
{
  [ApiController]
  [Route("[controller]")]
  public class ProductsController : ControllerBase
  {

    private readonly string _connectionString = "Server=CARLOS\\MSSQLSERVER2;Database=bdProyecto;User Id=carlos;Password=110206;TrustServerCertificate=true";

    [HttpGet]
    public IActionResult GetAll()
    {
      using var connection = new SqlConnection(_connectionString);

      string sql = "SELECT * FROM productos";
      var productos = connection.Query<Product>(sql);

      return Ok(productos);
    }

    [HttpPost]
    public IActionResult Create(Product product)
    {
      using var connection = new SqlConnection(_connectionString);

      // Validar nombre repetido
      string sqlCheck = "SELECT COUNT(*) FROM productos WHERE producto = @Producto";
      int exists = connection.ExecuteScalar<int>(sqlCheck, new { product.Producto });

      if (exists > 0)
      {
        return BadRequest(new { message = "Ya existe un producto con ese nombre" });
      }

      // Obtener siguiente ID
      string sqlNextId = "SELECT ISNULL(MAX(id), 0) + 1 FROM productos";
      int nextId = connection.ExecuteScalar<int>(sqlNextId);

      string sqlInsert = @"INSERT INTO productos (id, producto, cantidad, precio, origen, img)
                                 VALUES (@Id, @Producto, @Cantidad, @Precio, @Origen, @Img)";

      connection.Execute(sqlInsert, new
      {
        Id = nextId,
        product.Producto,
        product.Cantidad,
        product.Precio,
        product.Origen,
        product.Img
      });

      return Ok(new { message = "Producto creado", id = nextId });

    }
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
      using var connection = new SqlConnection(_connectionString);

      string sqlDelete = "DELETE FROM productos WHERE id = @Id";

      int rows = connection.Execute(sqlDelete, new { Id = id });

      if (rows == 0)
        return NotFound(new { message = "El producto no existe" });

      return Ok(new { message = "Producto eliminado" });
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
      using var connection = new SqlConnection(_connectionString);

      string sql = "SELECT * FROM productos WHERE id = @Id";
      var product = connection.QueryFirstOrDefault<Product>(sql, new { Id = id });

      if (product == null)
        return NotFound(new { message = "Producto no encontrado" });

      return Ok(product);
    }

    [HttpPut("{id}")]
    public IActionResult Update(int id, Product product)
    {
      using var connection = new SqlConnection(_connectionString);

      string sqlCheck = "SELECT COUNT(*) FROM productos WHERE id = @Id";
      int exists = connection.ExecuteScalar<int>(sqlCheck, new { Id = id });

      if (exists == 0)
        return NotFound(new { message = "El producto no existe" });

      string sqlUpdate = @"UPDATE productos 
                       SET producto = @Producto, 
                           cantidad = @Cantidad, 
                           precio = @Precio, 
                           origen = @Origen,
                           img = @Img
                       WHERE id = @Id";

      connection.Execute(sqlUpdate, new
      {
        Id = id,
        product.Producto,
        product.Cantidad,
        product.Precio,
        product.Origen,
        product.Img
      });

      return Ok(new { message = "Producto actualizado" });
    }


  }
}
