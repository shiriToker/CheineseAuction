using Microsoft.AspNetCore.Mvc;
using projectServer.Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace projectServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonorsController : ControllerBase
    {
        // GET: api/<DonorsController>
        [HttpGet]
        public ActionResult<IEnumerable<Donor>> Get()
        {
            if (Repository.donors == null)

                return NoContent();
            return Ok(Repository.donors);
        }

        // GET api/<DonorsController>/5
        [HttpGet("{id}")]
        public ActionResult<Donor> Get(string id)
        {
            Donor currDonor = Repository.donors.FirstOrDefault(item => item.id == id);
            if (currDonor == null)
                return BadRequest("There is no donor!");
            return Ok(currDonor);
        }

        // POST api/<DonorsController>
        [HttpPost]
        public ActionResult Post([FromBody] Donor donor)
        {
            if (donor == null) return BadRequest("The donor is null");
            if (donor.id == null || donor.city == null || donor.name == null )
                return BadRequest("all fields are required");
            Repository.donors.Add(donor);
            return Ok();
        }

        // PUT api/<DonorsController>/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] Donor donorToUpdate)
        {
            Donor currDonor = Repository.donors.FirstOrDefault(item => item.id == id);
            if (currDonor == null)
                return BadRequest("There is no such donor");
            if (donorToUpdate.id == null || donorToUpdate.city == null || donorToUpdate.name == null)
                return BadRequest("all fields are required");
            currDonor.id = donorToUpdate.id;
            currDonor.city = donorToUpdate.city;
            currDonor.name = donorToUpdate.name;
            return Ok();

        }

        // DELETE api/<DonorsController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            Donor currDonor = Repository.donors.FirstOrDefault(item => item.id == id);

            if (currDonor == null)
                return BadRequest("Donor not found.");

            bool hasGifts = Repository.gifts.Any(gift => gift.donor == currDonor.name);
            if (hasGifts)
                return BadRequest("Cannot delete donor. There are gifts associated with this donor.");

            Repository.donors.Remove(currDonor);
            return Ok();
        }

    }
}
