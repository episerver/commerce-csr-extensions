import ReactDOM from "react-dom";
import CartTab1 from "./CartTab1";

if (process.env.NODE_ENV === "development") {
    const { worker } = require("../../mocks/browser");
    worker.start();
}

ReactDOM.render(<CartTab1 groupOrderId={1} />, document.getElementById("root"));
