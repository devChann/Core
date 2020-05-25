using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infratrastructure.CoreLogic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Core.Controllers
{
    //[Route("api/[controller]")]
    //[ApiController]
    public class DataApiController : ControllerBase
    {
        private CoreLogic _coreLogic = new CoreLogic();

        [HttpGet]
        //[Route("api/all")]
        public ActionResult getFarmersProfile()
        {
            return Ok(_coreLogic.getAllfarmers());
        }
    }
}
