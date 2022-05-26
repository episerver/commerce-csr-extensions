using Mediachase.Commerce.Orders;
using Mediachase.MetaDataPlus.Configurator;

namespace CsrExtensions.CartTab1
{
    public static class InitializeCartTab1
    {
        public static void AddCartMetaFieldsIfNesccessary()
        {
            var orderContext = OrderContext.MetaDataContext;
            if (orderContext == null)
            {
                return;
            }

            var cartMetaClass = OrderContext.Current.ShoppingCartMetaClass;
            if (cartMetaClass == null)
            {
                return;
            }

            MetaFieldExtensions.TryAddMetaField(orderContext, cartMetaClass, Constants.CartExpireDate, MetaDataType.DateTime, 8);
            MetaFieldExtensions.TryAddMetaField(orderContext, cartMetaClass, Constants.CartStatus, MetaDataType.LongString, 4000);
            MetaFieldExtensions.TryAddMetaField(orderContext, cartMetaClass, Constants.CartDiscount, MetaDataType.Decimal, 17);
            MetaFieldExtensions.TryAddMetaField(orderContext, cartMetaClass, Constants.CustomerFullName, MetaDataType.ShortString, 512);
            MetaFieldExtensions.TryAddMetaField(orderContext, cartMetaClass, Constants.CustomerEmailAddress, MetaDataType.ShortString, 512);
        }
    }
}
