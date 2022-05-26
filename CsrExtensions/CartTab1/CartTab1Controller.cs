using EPiServer.Commerce.Order;
using EPiServer.Shell.Web.Mvc;
using Microsoft.AspNetCore.Mvc;
using System;

namespace CsrExtensions.CartTab1
{
    public class CartTab1Controller : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;

        public CartTab1Controller(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpGet]
        [Route("csr/api/extensions/carttab1/{orderGroupId}")]
        public IActionResult Get(int orderGroupId)
        {
            var cart = _orderRepository.Load<ICart>(orderGroupId);
            var model = new CartTab1Model();

            var cartExpireDate = cart.Properties[Constants.CartExpireDate]?.ToString() ?? DateTime.Now.ToString();
            var cartStatus = cart.Properties[Constants.CartStatus]?.ToString() ?? string.Empty;
            var cartDiscount = cart.Properties[Constants.CartDiscount]?.ToString() ?? "0";
            var customerFullName = cart.Properties[Constants.CustomerFullName]?.ToString() ?? string.Empty;
            var customerEmailAddress = cart.Properties[Constants.CustomerEmailAddress]?.ToString() ?? string.Empty;

            if (cart != null)
            {
                model.CartExpireDate = DateTime.Parse(cartExpireDate);
                model.CartStatus = cartStatus;
                model.CartDiscount = decimal.Parse(cartDiscount);
                model.CustomerFullName = customerFullName;
                model.CustomerEmailAddress = customerEmailAddress;
            }

            return new JsonDataResult(model);
        }

        [HttpPost]
        [Route("csr/api/extensions/carttab1/{orderGroupId}")]
        public IActionResult Update([FromRoute] int orderGroupId, [FromBody] CartTab1Model model)
        {
            var cart = _orderRepository.Load<ICart>(orderGroupId);

            cart.Properties[Constants.CartExpireDate] = model.CartExpireDate;
            cart.Properties[Constants.CartStatus] = model.CartStatus;
            cart.Properties[Constants.CartDiscount] = model.CartDiscount;
            cart.Properties[Constants.CustomerFullName] = model.CustomerFullName;
            cart.Properties[Constants.CustomerEmailAddress] = model.CustomerEmailAddress;

            _orderRepository.Save(cart);

            return Ok();
        }
    }
}
