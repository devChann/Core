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
        public string GetAllFarmersProfiles()
        {

            var geojsonndata = new FeatureCollection()
            {
                CRS = new GeoJSON.Net.CoordinateReferenceSystem.NamedCRS("urn:ogc:def:crs:OGC:1.3:CRS84")
            };

            using (var _context = new NARIGPCoreContext())
            {
                var farmers = _context.Transactions.ToList();

                farmers.ForEach(sa =>
                {
                    var transModel = new TransModel()
                    {
                        Id = sa.Id,
                        Name = sa.Name,
                        AgeGroup = sa.AgeGroup,
                        Phone = sa.Phone,
                        Gender = sa.Gender,
                        Ward = sa.Ward,
                        Cig = sa.Cig,
                        ValueChain = sa.ValueChain,
                        Iw = sa.Iw,
                        Category = sa.Category,
                        CCAT= sa.CCAT,
                        LCAT= sa.LCAT,
                        TotalLivestock=sa.TotalLivestock,
                        Qty = sa.Qty,
                        Production = sa.Production,
                        Acreage = sa.Acreage,
                        Variety = sa.Variety,
                    };

                    double X = double.Parse(sa.x);
                    double Y = double.Parse(sa.y);
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