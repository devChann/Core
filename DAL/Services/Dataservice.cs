using GeoJSON.Net.Feature;
using GeoJSON.Net.Geometry;
using System.Linq;
using Newtonsoft.Json;
using DAL.Interface;
using System.Threading.Tasks;
using DAL.Contexts;

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
                var query = farmers.GroupJoin(farmActivities,
                    fp => fp.Id,
                    fa => fa.TransactionsId,
                    (fp, results) => new TransactionViewModel(
                    fp.Id ,   
                    fp.Name,
                    fp.Phone,
                    fp.Gender,
                    fp.AgeGroup,
                    fp.SubCounty,
                    fp.Ward,
                    fp.Vcgroup,
                    fp.C302,
                    fp.C11501,
                    fp.C11301,
                    
                    fp.Geometry,
                    results)).ToList();

                query.ForEach(sa =>
                {
                    var transModel = new TransModel()
                    {
                        Id = sa.Id,
                        Name = sa.Name,
                        AgeGroup = sa.AgeGroup,
                        Phone = sa.Phone,
                        Gender = sa.Gender,
                        Vcgroup = sa.Vcgroup,
                        Ward=sa.Ward,
                        SubCounty = sa.SubCounty,
                        C302 = sa.C302,
                        C11501 = sa.C11501,
                        C11301 = sa.C11301,
                        Long = sa.Geometry.Coordinate.X,
                        Lat = sa.Geometry.Coordinate.Y,
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
            return  actualJson;

        }
    }
}