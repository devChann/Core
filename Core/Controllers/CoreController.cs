using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using CORE.Models;
using Infratrastructure.CoreLogic;
using DAL.Contexts;
using Microsoft.EntityFrameworkCore;

namespace CORE.Controllers
{
    public class CoreController : Controller
    {
        private readonly ILogger<CoreController> _logger;
        private CoreLogic _coreLogic = new CoreLogic();
        //private readonly NARIGPCoreContext _context;
        public CoreController(ILogger<CoreController> logger)
        {
            _logger = logger;
            //_context = context;
        }

        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public async Task< ActionResult> getFarmersProfile()
        {
            //var blogs =_context.Transactions
            //        .Include(sa=>sa.Txns)

            //        .ToList();
            var results = await _coreLogic.getAllFarmersData();
            return Json(results);
        }

    }
}
