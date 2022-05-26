# Customer Service Extensions Sample

## What is this project about?
This project is a sample for extended components which are used to extend the funtionalities in Optimizely's Customer Service (aka CSR).

## Prerequisites
* [NodeJS equal or greater than v16.10.0](https://nodejs.org/download/release/v16.10.0/)
* [yarn](https://yarnpkg.com)
* [Optimzely Commerce equal or greater than 14](https://world.optimizely.com/products/#b2b)

## How it works
The CSR extended components will be added as extra views in CSR UI. There are 3 order types in CSR UI for these components to be added.
* Cart
* Order
* Subscription

In each order type, there are 3 locations which have the existing placeholder, this is where extended components are displayed.
* Header
* Footer
* Tab

These extended components will be pre-built from ReactJS to CommonJS.
After this extension package is installed, the Placeholder in CSR UI reads all necessary information of each component such as order type, location,
and the URL where the CommomJS code of this component is located.
When the CSR applicaition is running, it uses the URL to get a CommonJS file of a certain component and load it to the view at runtime.

## Getting Started
CSR needs to know its extended components exist using ExtendedComponentOptions class. This class contains all information that CSR needs to work with.
* Name: The display name of component.
* ScriptUrl: The link of pre-built component.
* Order: The displaying order on UI
* ComponentLocation: The location of component. Using enum value.
  - Header = 0,
  - Footer = 1,
  - Tab = 2
* OrderTypes: The order types component applies to. Using flag enum value.
  - Cart = 1,
  - PurchaseOrder = 2,
  - Subscription = 4
* IsProtectedModule: Determines the extended component is in protected module or not.

### Step 1: Config components' information

There are 2 ways to config.
* Using appsettings.json
{
  ...
  "EPiServer": {
    ...
    "Commerce": {
      ...
      "ExtendedComponentOptions": {
        "ExtendedComponents": [
          {
            "Name": "CsrExtensionCartPurchaseOrderSubscriptionTab3",
            "ScriptUrl": "EPiServer.Commerce.UI.CustomerService.Extensions/clientResources/dist/CsrExtensionCartPurchaseOrderSubscriptionTab3/CsrExtensionCartPurchaseOrderSubscriptionTab3.js",
            "Order": 2,
            "ComponentLocation": 2,
            "OrderTypes": 7,
            "IsProtectedModule": true,
          }
        ]
      }
    },
    ...
}

OrderTypes uses flag enum, if a component belongs to more than one type, use the combination. For example: OrderTypes = 7 means this component belongs to Cart, PurchaseOrder, and Subscription.

* Using InitializableModule
In ConfigureContainer of Initialization file, use ServiceConfigurationContext to add components.
context.Services.Configure<ExtendedComponentOptions>(x =>
    {
        x.ExtendedComponents.AddRange(new[]
        {
            Name = "CsrExtensionCartPurchaseOrderSubscriptionTab3",
            ScriptUrl = "EPiServer.Commerce.UI.CustomerService.Extensions/clientResources/dist/CsrExtensionCartPurchaseOrderSubscriptionTab3/CsrExtensionCartPurchaseOrderSubscriptionTab3.js",
            Order = 2,
            ComponentLocation = ComponentLocation.Tab,
            OrderTypes = OrderTypes.Cart | OrderTypes.PurchaseOrder | OrderTypes.Subscription,
            IsProtectedModule = true,
        });
    });

### Step 2: Build React components
1. In src folder, create a new folder, each folder will be corresponding to a component.
2. Create a component file which will be built into a remote component.
3. Create index file for for local development.
    ```sh
    yarn dev:server --config-name config-{folder name of the component}
    ```
to start webpack-dev-server and develop the component. Example: yarn dev:server --config-name config-CsrExtensionCartTab2
The localhost will run in port 9090.
4. After finishing development, run
    ```sh
    yarn build:release
    ```
to generate a commonJS file of the component.
5. Run commerce site, and the component will be loaded at runtime.

    ```sh
    yarn build: debug => build in debug mode, mapping file will be generated for debugging.
    yarn build: watch => build in debug mode, watch changes and re-build each changes.
    ```

### Step 3: Add component's controller
For more complex usage, a controller should be created.
Create a new folder in the root folder of the project, the folder name of the component should be the same as the one's folder in src folder (not mandatory, but for easy management).

## Alternative
Instead of creating extended components in a separate module, the alternative way is to add pre-built component JS file to the web app (for example: put the JS file in wwwroot folder)
### Step 1: Config components' information

Using appsettings.json
{
  ...
  "EPiServer": {
    ...
    "Commerce": {
      ...
      "ExtendedComponentOptions": {
        "ExtendedComponents": [
          {
            "Name": "CsrExtensionCartTab4",
            "ScriptUrl": "/js/CsrExtensionCartTab4/CsrExtensionCartTab4.js",
            "Order": 0,
            "ComponentLocation": 2,
            "OrderTypes": 1,
            "IsProtectedModule": false
          }
        ]
      }
    },
    ...
}

Set IsProtectedModule is false.

### Step 2: Build React components
Create a client app to build extended components to commonJS files.

### Step 3: Add components' controller
Add controller if necessary.

## Usage example
CsrExtensionCartTab1 folder has a full demo version of an extended component.

## License
Distributed under the MIT License.
