using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using projectServer.Entities;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace projectServer.Controllers
{


    [Route("api/[controller]")]
    [ApiController]
    public class GiftController : ControllerBase
    {

        // GET: api/<GiftController>
        [HttpGet]
        public ActionResult<IEnumerable<Gift>> Get()
        {
            if (Repository.gifts==null)
            
                return NoContent();  
            return Ok (Repository.gifts);
        }

        [HttpGet("Random")]
        public ActionResult<IEnumerable<object>> Random()
        {
            if (!Repository.hasLotteryRun) { 
            foreach (var gift in Repository.gifts)
            {
                if (gift.userNames.ToArray().Length > 0)
                {
                    var random = new Random();
                    var winner = gift.userNames[random.Next(gift.userNames.Count)];

                    Repository.winners.Add(new
                    {
                        GiftName = gift.name,
                        GiftImg = gift.imageUrl,
                        Winner = winner 
                    });
                }
            }
                Repository.hasLotteryRun = true;
            }
            return Ok(Repository.winners);
        }


        // GET api/<GiftController>/5
        [HttpGet("{id}")]
        public ActionResult<Gift> Get(string id)
        {
            Gift currGift= Repository.gifts.FirstOrDefault(item => item.id == id);
            if (currGift == null) 
                return BadRequest("There is no gift!");            
            return Ok(currGift);
        }

        // POST api/<GiftController>
        [HttpPost]

        public ActionResult Post([FromBody] Gift gift)
        {
            if (gift == null) return BadRequest("The gift is null");
            if(gift.id==null || gift.number==0 || gift.ticketPrice==0 || gift.name==null || gift.donor==null)      
                return BadRequest("all fields are required");
            Repository.gifts.Add(gift);
            return Ok();

        }


    // POST api/<GiftController>/AddGiftsToUser
[HttpPost("AddGiftsToUser")]
public ActionResult AddGiftsToUser([FromBody] GiftsAndUser request)
{

    if (request == null || request.Gifts == null || request.User == null)
        return BadRequest("Invalid data");

    foreach (var gift in request.Gifts)
    {
        var existingGift = Repository.gifts.FirstOrDefault(g => g.id == gift.id);
        if (existingGift != null)
        {
            existingGift.userNames.Add(request.User);
        }
    }

    return Ok();
}



        // PUT api/<GiftController>/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] Gift giftToUpdate)
        {
            Gift currGift = Repository.gifts.FirstOrDefault(item => item.id == id);
            if (currGift == null) 
                return BadRequest("There is no such gift");
            if (giftToUpdate.id == null || giftToUpdate.number == 0 || giftToUpdate.ticketPrice == 0 || giftToUpdate.name == null || giftToUpdate.donor == null)
                return BadRequest("all fields are required");
            currGift.id = giftToUpdate.id;
            currGift.number = giftToUpdate.number;
            currGift.ticketPrice = giftToUpdate.ticketPrice;
            currGift.name = giftToUpdate.name;
            currGift.donor = giftToUpdate.donor;
            currGift.imageUrl = giftToUpdate.imageUrl;

            return Ok();

        }

        // DELETE api/<GiftController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            Gift existGift = Repository.gifts.FirstOrDefault(item => item.userNames.Count > 0);
            if (existGift != null)
                return BadRequest("this gift is already bought");
            Gift currGift = Repository.gifts.FirstOrDefault(item => item.id == id);
            if (currGift == null)
                return BadRequest();

            Repository.gifts.Remove(currGift);
            return Ok();
        }

        [HttpDelete]
        public ActionResult<Gift> ResetUsersFromGift()
        {
            Repository.gifts.ForEach(item => item.userNames = new List<User>());
            return Ok(Repository.gifts);
        }
    }
}
