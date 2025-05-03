using projectServer.Entities;

namespace projectServer
{
    public class Repository
    {

        public static List<Gift> gifts { get; set; } = new()
{
    new Gift
    {
        id = "1",
        number = 1,
        name = "High-Quality Camera",
        donor = "Jack",
        ticketPrice = 10,
        imageUrl = "/assets/camera.jpeg"
    },
    new Gift
    {
        id = "2",
        number = 2,
        name = "10,000$ Cash Reward",
        donor = "Jack",
        ticketPrice = 10,
        imageUrl = "/assets/cash.jpeg"
    },
    new Gift
    {
        id = "3",
        number = 3,
        name = "Luxurious Care Set",
        donor = "Tony",
        ticketPrice = 10,
        imageUrl = "/assets/cream.jpeg"
    },
    new Gift
    {
        id = "4",
        number = 4,
        name = "Elegant Necklace",
        donor = "Dylan",
        ticketPrice = 10,
        imageUrl = "/assets/necklace.jpeg"
    },
    new Gift
    {
        id = "5",
        number = 5,
        name = "Acoustic Guitar",
        donor = "Tony",
        ticketPrice = 10,
        imageUrl = "/assets/guitar.jpeg"
    },
    new Gift
    {
        id = "6",
        number = 6,
        name = "Premium Pot Set",
        donor = "Bob",
        ticketPrice = 10,
        imageUrl = "/assets/pots.jpeg"
    },
    new Gift
    {
        id = "7",
        number = 7,
        name = "Shopping Gift Card",
        donor = "Jack",
        ticketPrice = 10,
        imageUrl = "/assets/shopping.jpeg"
    },
    new Gift
    {
        id = "8",
        number = 8,
        name = "Comfortable Armchair",
        donor = "Tony",
        ticketPrice = 10,
        imageUrl = "/assets/sofa.jpeg"
    }
};

        public static List<Donor> donors { get; set; } = new() {
            new Donor
            {
                id="1",
                name="Jack",
                city="Brooklyn"
            },
             new Donor
            {
                id="2",
                name="Tony",
                city="Jerusalem"
            },
              new Donor
            {
                id="3",
                name="Bob",
                city="New York"
            },
               new Donor
            {
                id="4",
                name="Dylan",
                city="Monsey"
            }

        };
        public static List<User> users { get; set; } = new();

        public static List<object> winners { get; set; } = new();

        public static bool hasLotteryRun { get; set; } = false;





    }
}
