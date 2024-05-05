namespace API.DTOs
{
    public class UpdateDto
    {
        public int Id { get; set; }
        public string Naziv { get; set; }

        public int Ocjena { get; set; }

        public string Sastojci { get; set; }
    }
}
