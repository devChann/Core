using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infratrastructure.CoreLogic;
using Microsoft.AspNetCore.Mvc;

namespace CORE.Controllers
{
    public class DataApiController : Controller
    {
        //private CoreLogic _coreLogic = new CoreLogic();

        [HttpGet]
        //[Route("api/all")]
        public ActionResult getFarmersProfile()
        {
            return Ok();
        }
    }
}