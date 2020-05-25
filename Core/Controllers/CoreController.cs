using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infratrastructure.CoreLogic;
using Microsoft.AspNetCore.Mvc;

namespace Core.Controllers
{
    public class CoreController : Controller
    {
        private CoreLogic _coreLogic = new CoreLogic();
        public async Task<ActionResult> getFarmersProfile()
        {
            return Json(await _coreLogic.getAllfarmers());

        }
    }
}