import CartTab1 from "./CartTab1";
import { setupServer } from "msw/node";
import { render, screen, waitFor } from "@testing-library/react";
import { handlers } from "../../mocks/handlers";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("CartTab1 tests", () => {
    beforeEach(async () => {
        render(<CartTab1 groupOrderId={1} />);
        await screen.findByText("CartTab1");
    });

    test("Should render correct title", async () => {
        expect(screen.getByText("CartTab1")).toBeInTheDocument();
    });

    test("Should render correct button", async () => {
        expect(screen.getByText("Save")).toBeInTheDocument();
    });

    test("Should have all data fetched", async () => {
        expect(screen.getByLabelText("Cart Expire Date")).toHaveValue("2022-04-19T00:00");
        expect(screen.getByLabelText("Cart Status")).toHaveValue("OK");
        expect(screen.getByLabelText("Cart Discount")).toHaveValue(3);
        expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
        expect(screen.getByDisplayValue("john@email.com")).toBeInTheDocument();
    });

    test("Should enter input values correctly", async () => {
        const cartDiscountInput = screen.getByLabelText("Cart Status");
        await userEvent.click(cartDiscountInput);
        await userEvent.keyboard("{Control>}A{/Control}FULL");
        expect(cartDiscountInput).toHaveValue("FULL");
    });

    test("Should post successfully", async () => {
        const button = screen.getByText("Save");
        await userEvent.click(button);
        await waitFor(() => {
            expect(screen.getByText("Saved successfully.")).toBeInTheDocument();
        });
    });
});
