using System.Diagnostics;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Core.Models;
using Infratrastructure.CoreLogic;
using DAL.DataContext;
using Microsoft.EntityFrameworkCore;
using GeoJSON.Net.Feature;
using GeoJSON.Net.Geometry;
using Newtonsoft.Json;
using DAL.Services;
using System.Linq;
using Microsoft.AspNetCore.Identity;
using DAL.Entities;

namespace Core.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private UserManager<AppUser> _userManager;
        private SignInManager<AppUser> _signInManager;
       
        public HomeController(ILogger<HomeController> logger,UserManager<AppUser> userManager,SignInManager<AppUser> signInManager)
        {
            _logger = logger;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public IActionResult Index()
        {

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult Login()
        {
            
            return View();
        }

        public IActionResult AdminPanel()
        {
            return View();
        }
        
        public async Task<IActionResult> Register(RegisterViewModel registerViewModel)
        {
            if (ModelState.IsValid)
            {
                var newUser = new AppUser
                {
                    Email = registerViewModel.Email
                };
                var results = await _userManager.CreateAsync(newUser, registerViewModel.Password);
                if (results.Succeeded)
                {
                    ViewBag.Message = "Login credentials Have been Created, wait for admin to Approve";
                    await _signInManager.SignInAsync(newUser, false);
                    return RedirectToAction("Login", "Home");
                }
                else
                {
                    foreach(var error in results.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }
                }
            }
            return View();
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
        [HttpGet]
       
        [HttpGet]
        public ViewResult Register()
        {
            return View();
        }
       
    }
}
