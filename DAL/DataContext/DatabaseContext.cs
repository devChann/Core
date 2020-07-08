using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using DAL.Contexts;

namespace DAL.DataContext
{
    public class DatabaseContext:DbContext
    {
        public class appBuild
        {
            public static readonly Microsoft.Extensions.Logging.ILoggerFactory MyLoggerFactory = Microsoft.Extensions.Logging.LoggerFactory.Create(builder =>
            {
                builder
                .AddFilter((category, level) =>
                    category == DbLoggerCategory.Database.Command.Name
                    && level == LogLevel.Information)
                .AddConsole();
            });
            public appBuild()
            {
                settings = new AppConfiguration();
                oppsBuilder = new DbContextOptionsBuilder<DatabaseContext>();
                oppsBuilder.UseSqlServer(settings.SqlConnection,x=>x.UseNetTopologySuite());
                oppsBuilder.UseLoggerFactory(MyLoggerFactory);
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
