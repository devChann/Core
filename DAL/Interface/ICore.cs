using DAL.Entities;
using DAL.Services;
using GeoJSON.Net.Feature;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Interface
{
    public interface ICore
    {
        public Task<string> GetAllFarmersProfiles();
       

    }
}
