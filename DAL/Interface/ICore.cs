using System.Threading.Tasks;

namespace DAL.Interface
{
    public interface ICore
    {
        public  Task<string> GetAllFarmersProfiles();
       

    }
}
