using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Infratrastructure.CoreLogic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;

namespace Client.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class DataController : ControllerBase
    {
        private CoreLogic _corelogic = new CoreLogic();
       //GET api/getfarmers
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var results = await _corelogic.getAllFarmersData();
            return new JsonResult(results);
        }

    }
}