import { rest } from "msw";
import CsrExtensionCartTab1Data from "./csr-extension-cart-tab-1.json";
import WeatherMockData from "./weather-mock-data.json";

export const handlers = [
    rest.get("/csr/api/extensions/carttab1/1", (_req, res, ctx) => {
        return res(ctx.json(CsrExtensionCartTab1Data), ctx.status(200));
    }),

    rest.post("/csr/api/extensions/carttab1/1", (_req, res, ctx) => {
        return res(ctx.status(200));
    }),

    rest.get("/getWeatherInformation", (_req, res, ctx) => {
        return res(ctx.json(WeatherMockData), ctx.status(200));
    }),
];
