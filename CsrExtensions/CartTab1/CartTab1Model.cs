using System;

namespace CsrExtensions.CartTab1
{
    public class CartTab1Model
    {
        public DateTime CartExpireDate { get; set; }
        public string CartStatus { get; set; }
        public decimal CartDiscount { get; set; }
        public string CustomerFullName { get; set; }
        public string CustomerEmailAddress { get; set; }
    }
}
