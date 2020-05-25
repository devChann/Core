using DAL.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.DataContext
{
    public class IdentityContext:IdentityDbContext<AppUser,AppRole,int>
    {
        public IdentityContext(DbContextOptions<IdentityContext>options):base(options)
        {
            
        }
    }
}
