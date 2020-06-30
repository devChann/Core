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
using System.Security.Cryptography;
using System.Runtime.CompilerServices;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using DAL.Contexts;
using System.Xml.Linq;

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

            using (var _context = new NARIGPCoreContext())
            {
                var farmers = _context.Transactions.ToList();
                var farmActivities = _context.Txns.ToList();
                //var sa = (from x in farmers
                //          join xa in farmActivities on x.Id equals xa.TransactionId
                //          group new { x.Name, x.Phone,x.Gender,x.AgeGroup,
                //              xa.Category, xa.Produce,xa.Quantity,xa.Revenue,xa.Breed,xa.BreedGender,
                //              xa.AmtofMilkdp,xa.Age,
                //              } by new { x.Geometry } into grp
                //          select new { geom=grp.Key,txns=grp.ToList() }).ToList();


                //foreach(var i in sa)
                // {
                //     double X = i.geom.Geometry.Coordinate.X;
                //     double Y = i.geom.Geometry.Coordinate.Y;
                //     var point = new Point(new Position(Y, X));
                //     var viewModel = new ViewModel();
                //     foreach(var xa in i.txns)
                //     {
                //         viewModel.Name = xa.Name;
                //         viewModel.Phone = xa.Phone;
                //         viewModel.AgeGroup = xa.AgeGroup;
                //         viewModel.Category = xa.Category;
                //         viewModel.Produce = xa.Produce;
                //         viewModel.Quantity = xa.Quantity;
                //         viewModel.Revenue = xa.Revenue;
                //         viewModel.Breed = xa.Breed;
                //         viewModel.BreedGender = xa.BreedGender;
                //         viewModel.AmtofMilkdp = xa.AmtofMilkdp;
                //         viewModel.AmtofMilkdp = xa.AmtofMilkdp;

                //     }   
                //     var feature = new GeoJSON.Net.Feature.Feature(point, viewModel);
                //     geojsonndata.Features.Add(feature);

                //}
                var query = farmers.GroupJoin(farmActivities,
                    fp => fp.Id,
                    fa => fa.TransactionId,
                    (fp, results) => new TransactionViewModel(
                    fp.Id ,   
                    fp.Name,
                    fp.Phone,
                    fp.Gender,
                    fp.AgeGroup,
                    fp.SubCounty,
                    fp.Ward,
                    fp.Vcgroup,
                    fp.Geometry,
                    results)).ToList();

                query.ForEach(sa =>
                {
                    var transModel = new TransModel()
                    {
                        Id = sa.Id,
                        Name = sa.Name,
                        Phone = sa.Phone,
                        
                        Txns = sa.Results.ToList()
                    };
                    double X = sa.Geometry.Coordinate.X;
                    double Y = sa.Geometry.Coordinate.Y;
                    var point = new Point(new Position(Y, X));
                    var feature = new GeoJSON.Net.Feature.Feature(point, transModel);
                    geojsonndata.Features.Add(feature);
                });
            }
            var actualJson = JsonConvert.SerializeObject(geojsonndata);
            return actualJson;

        }
    }
}