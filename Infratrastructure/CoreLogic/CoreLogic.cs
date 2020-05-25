using DAL.Entities;
using DAL.Interface;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Infratrastructure.CoreLogic
{
    public class CoreLogic
    {
        
        private ICore _icore = new DAL.Services.Dataservice(); // instantiate the interface 

        public async Task<string> getAllfarmers()
        {
            try
            {
                var results = await _icore.GetAllFarmersProfiles();

                if(!String.IsNullOrEmpty(results))
                {
                    return (results);
                }
                else
                {
                    return (" not data");
                }
            }
            catch(Exception error)
            {
                return error.ToString();
            }
        }
        //public async Task<bool> Register()
        //{
        //    try
        //    {
        //        var users = _icore.Register();
        //        if(users == null)
        //        {
        //            AppUser user = new AppUser();
        //            user.FirstName = "Chann";
        //            user.LastName = "Isaac";
        //            user.Email = "ichann@osl.co.ke";
        //            IdentityResult result = await userMgr.CreateAsync(user, "admin123");
        //            return true;
        //        }
        //        else { return false; }

        //    }
        //    catch (Exception e)
        //    {
        //        return false;
        //    }
        //}
    }
}
