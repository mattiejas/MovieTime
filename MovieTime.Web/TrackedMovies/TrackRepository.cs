using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.EntityFrameworkCore;
using MovieTime.Web.Database;
using MovieTime.Web.TrackedMovies.Models;
using Serilog;

namespace MovieTime.Web.TrackedMovies
{
    public class TrackRepository : GenericRepository<TrackedMovie>, ITrackRepository
    {
        public TrackRepository(MovieContext context) : base(context)
        {
        }
    }
}