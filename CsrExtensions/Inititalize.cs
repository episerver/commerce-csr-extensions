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
                    if (!pm.Items.Any(i => i.Name.Equals("CsrExtensions", System.StringComparison.OrdinalIgnoreCase)))
                    {
                        pm.Items.Add(new ModuleDetails() { Name = "CsrExtensions" });
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
                        Name = "CartTab1",
                        ScriptUrl = Paths.ToClientResource(GetType().Assembly, "clientResources/dist/CartTab1/CartTab1.js"),
                        Order = 1,
                        OrderTypes = OrderTypes.Cart,
                    },
                    new ExtendedComponent
                    {
                        ComponentLocation = ComponentLocation.Tab,
                        Name = "CartTab2",
                        ScriptUrl = Paths.ToClientResource(GetType().Assembly, "clientResources/dist/CartTab2/CartTab2.js"),
                        Order = 2,
                        OrderTypes = OrderTypes.Cart,
                    },
                    new ExtendedComponent
                    {
                        ComponentLocation = ComponentLocation.Tab,
                        Name = "CartOrderSubscriptionTab3",
                        ScriptUrl = Paths.ToClientResource(GetType().Assembly, "clientResources/dist/CartOrderSubscriptionTab3/CartOrderSubscriptionTab3.js"),
                        Order = 3,
                        OrderTypes = OrderTypes.Cart | OrderTypes.PurchaseOrder | OrderTypes.Subscription,
                    },
                    new ExtendedComponent
                    {
                        ComponentLocation = ComponentLocation.Header,
                        Name = "CartHeader1",
                        ScriptUrl = Paths.ToClientResource(GetType().Assembly, "clientResources/dist/CartHeader1/CartHeader1.js"),
                        Order = 1,
                        OrderTypes = OrderTypes.Cart,
                    },
                    new ExtendedComponent
                    {
                        ComponentLocation = ComponentLocation.Header,
                        Name = "CartHeader2",
                        ScriptUrl = Paths.ToClientResource(GetType().Assembly, "clientResources/dist/CartHeader2/CartHeader2.js"),
                        Order = 2,
                        OrderTypes = OrderTypes.Cart,
                    },
                    new ExtendedComponent
                    {
                        ComponentLocation = ComponentLocation.Footer,
                        Name = "CartFooter",
                        ScriptUrl =  Paths.ToClientResource(GetType().Assembly, "clientResources/dist/CartFooter/CartFooter.js"),
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
