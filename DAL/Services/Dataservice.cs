using System;
using System.Collections.Generic;
using System.Text;
using DAL.DataContext;
using Microsoft.EntityFrameworkCore;
using GeoJSON.Net.Feature;
using GeoJSON.Net.Geometry;
using System.Linq;
using NetTopologySuite.IO;
using Newtonsoft.Json;
using DAL.Interface;
using System.Threading.Tasks;
using System.Collections;
using Microsoft.AspNetCore.Identity;
using DAL.Entities;

namespace DAL.Services
{
    public class Dataservice : ICore
    {
        
        public async Task<string> GetAllFarmersProfiles()
        {
            var geojsonndata = new FeatureCollection()
            {
                CRS = new GeoJSON.Net.CoordinateReferenceSystem.NamedCRS("urn:ogc:def:crs:OGC:1.3:CRS84")
            };
            using (var context = new DatabaseContext(DatabaseContext.Ops.dbOptions))
            {
                var farmersProfiles = await context.Transactions.Include(sa => sa.Txns).ToListAsync();
                farmersProfiles.ForEach(sa =>
                {
                    var trans = new TransactionViewModel
                    {
                        Name = sa.Name,
                        Phone = sa.Phone,
                        Gender = sa.Gender,
                        AgeGroup = sa.AgeGroup,
                        SubCounty = sa.SubCounty,
                        Ward = sa.SubCounty,
                        Vcgroup = sa.Vcgroup,
                        Txns = sa.Txns
                    };

                    double xcoord = sa.Geometry.Coordinate.X;
                    double ycoord = sa.Geometry.Coordinate.Y;

                    var point = new Point(new Position(xcoord, ycoord));
                    var feature = new GeoJSON.Net.Feature.Feature(point, trans);
                    geojsonndata.Features.Add(feature);

                });
            }
            var actualJson = JsonConvert.SerializeObject(geojsonndata);
            return actualJson;

        }
    }
}