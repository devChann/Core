using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infratrastructure.CoreLogic;
using Microsoft.AspNetCore.Mvc;

namespace UI.Controllers
{
    public class DataController : Controller
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