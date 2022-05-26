using CsrExtensions.CartTab1;
using EPiServer.Commerce.UI.CustomerService.Extensibility;
using EPiServer.Framework;
using EPiServer.Framework.Initialization;
using EPiServer.ServiceLocation;
using EPiServer.Shell;
using EPiServer.Shell.Modules;
using EPiServer.Web;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;

namespace CsrExtensions
{
    [InitializableModule]
    [ModuleDependency(typeof(InitializationModule), typeof(ShellInitialization))]
    public class Inititalize : IConfigurableModule
    {
        public void ConfigureContainer(ServiceConfigurationContext context)
        {
            context.Services.Configure<ProtectedModuleOptions>(
                pm =>
                {
                    if (!pm.Items.Any(i => i.Name.Equals("EPiServer.Commerce.UI.CustomerService.Extensions", System.StringComparison.OrdinalIgnoreCase)))
                    {
                        pm.Items.Add(new ModuleDetails() { Name = "EPiServer.Commerce.UI.CustomerService.Extensions" });
                    }
                });

            context.Services.UseSystemTextJsonSerialization(GetType().Assembly, settings => settings.PropertyNamingPolicy = null);

            context.Services.Configure<ExtendedComponentOptions>(x =>
            {
                x.ExtendedComponents.AddRange(new[]
                {
                    new ExtendedComponent
                    {
                        ComponentLocation = ComponentLocation.Tab,
                        Name = "CsrExtensionCartTab1",
                        ScriptUrl = Paths.ToClientResource(GetType().Assembly, "clientResources/dist/CsrExtensionCartTab1/CsrExtensionCartTab1.js"),
                        Order = 1,
                        OrderTypes = OrderTypes.Cart,
                    },
                    new ExtendedComponent
                    {
                        ComponentLocation = ComponentLocation.Tab,
                        Name = "CsrExtensionCartTab2",
                        ScriptUrl = Paths.ToClientResource(GetType().Assembly, "clientResources/dist/CsrExtensionCartTab2/CsrExtensionCartTab2.js"),
                        Order = 2,
                        OrderTypes = OrderTypes.Cart,
                    },
                    new ExtendedComponent
                    {
                        ComponentLocation = ComponentLocation.Tab,
                        Name = "CsrExtensionCartPurchaseOrderSubscriptionTab3",
                        ScriptUrl = Paths.ToClientResource(GetType().Assembly, "clientResources/dist/CsrExtensionCartPurchaseOrderSubscriptionTab3/CsrExtensionCartPurchaseOrderSubscriptionTab3.js"),
                        Order = 3,
                        OrderTypes = OrderTypes.Cart | OrderTypes.PurchaseOrder | OrderTypes.Subscription,
                    },
                    new ExtendedComponent
                    {
                        ComponentLocation = ComponentLocation.Header,
                        Name = "CsrExtensionCartHeader1",
                        ScriptUrl = Paths.ToClientResource(GetType().Assembly, "clientResources/dist/CsrExtensionCartHeader1/CsrExtensionCartHeader1.js"),
                        Order = 1,
                        OrderTypes = OrderTypes.Cart,
                    },
                    new ExtendedComponent
                    {
                        ComponentLocation = ComponentLocation.Header,
                        Name = "CsrExtensionCartHeader2",
                        ScriptUrl = Paths.ToClientResource(GetType().Assembly, "clientResources/dist/CsrExtensionCartHeader2/CsrExtensionCartHeader2.js"),
                        Order = 2,
                        OrderTypes = OrderTypes.Cart,
                    },
                    new ExtendedComponent
                    {
                        ComponentLocation = ComponentLocation.Footer,
                        Name = "CsrExtensionCartFooter",
                        ScriptUrl =  Paths.ToClientResource(GetType().Assembly, "clientResources/dist/CsrExtensionCartFooter/CsrExtensionCartFooter.js"),
                        Order = 1,
                        OrderTypes = OrderTypes.Cart,
                    }
                });
            });
        }

        void IInitializableModule.Initialize(InitializationEngine context)
        {
            InitializeCartTab1.AddCartMetaFieldsIfNesccessary();
        }

        public void Uninitialize(InitializationEngine context)
        {

        }
    }
}
