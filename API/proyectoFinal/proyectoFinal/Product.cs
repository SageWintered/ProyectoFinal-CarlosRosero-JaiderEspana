namespace proyectoFinal.Models
{
  public class Product
  {
    public int Id { get; set; }
    public string Producto { get; set; } = "";
    public int Cantidad { get; set; }
    public decimal Precio { get; set; }
    public string Origen { get; set; } = "";
    public string Img { get; set; }
  }
}
