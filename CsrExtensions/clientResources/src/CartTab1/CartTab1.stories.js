import CartTab1 from "./CartTab1";
import { handlers } from "../../mocks/handlers";

export default {
    title: "Cart Tab 1",
    component: CartTab1,
};

export const CartTab1WithoutData = () => <CartTab1 groupOrderId={0} />;

export const CartTab1WithData = () => <CartTab1 groupOrderId={1} />;
CartTab1WithData.parameters = {
    msw: {
        handlers: handlers,
    },
};
