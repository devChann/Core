using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.EntityFrameworkCore;
using DAL.Entities;

namespace DAL.DataContext
{
    public class DatabaseContext:DbContext
    {
        public class appBuild
        {
            public appBuild()
            {
                settings = new AppConfiguration();
                oppsBuilder = new DbContextOptionsBuilder<DatabaseContext>();
                oppsBuilder.UseSqlServer(settings.SqlConnection,x=>x.UseNetTopologySuite());
                dbOptions = oppsBuilder.Options;
            }
            public DbContextOptionsBuilder<DatabaseContext> oppsBuilder { get; set; } // api for configuring connection to DB
            public DbContextOptions<DatabaseContext> dbOptions { get; set; }
            private AppConfiguration settings { get; set; }
        }
        public static appBuild Ops = new appBuild();

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {

        }
        public virtual DbSet<Transactions> Transactions { get; set; }
        public virtual DbSet<Txns> Txns { get; set; }
    }
}
