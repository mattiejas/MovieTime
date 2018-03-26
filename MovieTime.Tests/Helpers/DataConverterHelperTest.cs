using System;
using FluentAssertions;
using MovieTime.Web.Helpers;
using Xunit;

namespace MovieTime.Tests.Helpers
{
    public class DataConverterHelperTest
    {
        [Theory]
        [InlineData("123 min", 123)]
        [InlineData("", null)]
        [InlineData("532 ", 532)]
        [InlineData("min", null)]
        [InlineData("280", 280)]
        public void TestOmdbRunTimeConverterWithCharacters(string runTime, int? expectedResult)
        {
            var result = DataConverterHelper.ConvertOmdbRuntimeToInt(runTime);
            result.Should().Be(expectedResult);
        }
    }
}