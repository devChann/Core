using DAL.Entities;
using DAL.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.Update;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Infratrastructure.CoreLogic
{
    public class CoreLogic
    {

        private ICore _icore = new DAL.Services.Dataservice(); // instantiate the interface 
        public async Task<string> getAllFarmersData()
        {
            var results = await _icore.GetAllFarmersProfiles();
            return results;
        }
        public void DogetAllFarmersData()
        {
            try
            {
                getAllFarmersData().Wait();
            }
            catch (Exception ex)
            {

            }
        }


    }
}
