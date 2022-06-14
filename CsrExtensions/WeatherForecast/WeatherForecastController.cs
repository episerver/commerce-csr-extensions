using EPiServer.Shell.Web.Mvc;
using Microsoft.AspNetCore.Mvc;

namespace CsrExtensions.WeatherForecast
{
    public class WeatherForecastController : ControllerBase
    {
        [HttpGet]
        [Route("/getWeatherInformation")]
        public IActionResult Get()
        {
            var model = new WeatherModel
            {
                Information = "20 Celsius, rainy!"
            };

            return new JsonDataResult(model);
        }
    }
}
