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

namespace DAL.Services
{
    public class Dataservice : ICore
    {
        //private readonly NARIGPCoreContext _context;
        //public Dataservice(NARIGPCoreContext context)
        //{
        //    _context = context;
        //}

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
                var query = farmers.GroupJoin(farmActivities,
                    fp => fp.Id,
                    fa => fa.TransactionId,
                    (fp, results) => new TransactionViewModel(
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