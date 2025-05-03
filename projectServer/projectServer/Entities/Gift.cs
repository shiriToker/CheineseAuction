using System.Text.Json.Serialization;

namespace projectServer.Entities
{
    public class Gift
    {
       
        public string? id { get; set; }
        public int? number { get; set; }
        public string? name { get; set; }
        public string? donor { get; set; }
        public int? ticketPrice { get; set; }
        public string? imageUrl { get; set; }
        public List<User>? userNames { get; set; }=new List<User>();

    }
}
