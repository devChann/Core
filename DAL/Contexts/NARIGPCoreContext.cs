using System;
using DAL.DataContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.Extensions.Logging;

namespace DAL.Contexts
{
    public partial class NARIGPCoreContext : DbContext
    {
        private AppConfiguration settings { get; set; }
        public static readonly Microsoft.Extensions.Logging.ILoggerFactory MyLoggerFactory = Microsoft.Extensions.Logging.LoggerFactory.Create(builder =>
        {
            builder
            .AddFilter((category, level) =>
                category == DbLoggerCategory.Database.Command.Name
                && level == LogLevel.Information)
            .AddConsole();
        });
        //public NARIGPCoreContext()
        //{
        //}

        //public NARIGPCoreContext(DbContextOptions<NARIGPCoreContext> options)
        //    : base(options)
        //{
        //}

        public virtual DbSet<Transactions> Transactions { get; set; }
        public virtual DbSet<Txns> Txns { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            settings = new AppConfiguration();
            optionsBuilder.UseSqlServer(settings.SqlConnection, x => x.UseNetTopologySuite())
                .UseLoggerFactory(MyLoggerFactory);
            
 
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Transactions>(entity =>
            {
                entity.Property(e => e.Id).HasMaxLength(36);

                //entity.Property(e => e.Geometry).HasColumnType("geometry");
            });

            modelBuilder.Entity<Txns>(entity =>
            {
                //entity.HasIndex(e => e.TransactionsId);

                //entity.Property(e => e.TransactionId)
                //    .IsRequired()
                //    .HasMaxLength(36);

                //entity.Property(e => e.TransactionsId).HasMaxLength(36);

                //entity.HasOne(d => d.Transactions)
                //    .WithMany(p => p.Txns)
                //    .HasForeignKey(d => d.TransactionsId);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
