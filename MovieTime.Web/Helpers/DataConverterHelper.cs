using System;
using System.Text.RegularExpressions;
using Serilog;

namespace MovieTime.Web.Helpers
{
    public class DataConverterHelper
    {
        public static int? ConvertOmdbRuntimeToInt(string runTime)
        {
            var nonNumericCharactersRegex = "[^\\d]";
            var runTimeInMinutes = Regex.Replace(runTime, nonNumericCharactersRegex, "");
            
            if (runTimeInMinutes.Length <= 0) return null;
            
            return short.Parse(runTimeInMinutes);
        }
    }
}