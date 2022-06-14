import ReactDOM from "react-dom";
import WeatherComponent from "./WeatherComponent";

if (process.env.NODE_ENV === "development") {
    const { worker } = require("../../mocks/browser");
    worker.start();
}

ReactDOM.render(<WeatherComponent />, document.getElementById("root"));
