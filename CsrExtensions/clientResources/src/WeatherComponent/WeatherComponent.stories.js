import WeatherComponent from "./WeatherComponent";
import { handlers } from "../../mocks/handlers";

export default {
    title: "Weather Component",
    component: WeatherComponent,
};

export const WeatherComponentWithoutData = () => <WeatherComponent />;

export const WeatherComponentWithData = () => <WeatherComponent />;
WeatherComponentWithData.parameters = {
    msw: {
        handlers: handlers,
    },
};
