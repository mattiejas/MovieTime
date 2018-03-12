using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace MovieTime.Web.Auth
{
    public static class ClaimsExtensions
    {
        public static string GetUserId(this ClaimsPrincipal principal){
            if (principal == null)
                return null;
            if (!principal.Identity.IsAuthenticated)
                return null;

            return principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        }
    }
}
