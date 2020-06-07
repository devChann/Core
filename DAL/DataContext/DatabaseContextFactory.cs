using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Logging;

namespace DAL.DataContext
{
    public class DatabaseContextFactory:IDesignTimeDbContextFactory<DatabaseContext>
    {
        public DatabaseContext CreateDbContext(string[] args)
        {

            AppConfiguration appConfig = new AppConfiguration();
            var oppsBuilder = new DbContextOptionsBuilder<DatabaseContext>();
            oppsBuilder.UseSqlServer(appConfig.SqlConnection, x =>x.UseNetTopologySuite());
            
            return new DatabaseContext(oppsBuilder.Options); // return the dbcontext.
        }

    }
}
