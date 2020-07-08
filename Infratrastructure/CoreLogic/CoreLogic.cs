using DAL.Interface;
using System;
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
