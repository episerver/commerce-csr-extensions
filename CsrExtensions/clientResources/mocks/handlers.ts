import { rest } from "msw";
import CsrExtensionCartTab1Data from "./csr-extension-cart-tab-1.json";

export const handlers = [
    rest.get("/csr/api/extensions/carttab1/1", (_req, res, ctx) => {
        return res(ctx.json(CsrExtensionCartTab1Data), ctx.status(200));
    }),

    rest.post("/csr/api/extensions/carttab1/1", (_req, res, ctx) => {
        return res(ctx.status(200));
    }),
];
