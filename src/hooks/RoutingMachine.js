import L from "leaflet";
import "leaflet-routing-machine";
import { createControlComponent } from "@react-leaflet/core";

const createRoutineMachineLayer = (props) => {
    const instance = L.Routing.control({
        waypoints: [
            L.latLng(16.506, 80.648),
            L.latLng(17.384, 78.4866),
            L.latLng(12.971, 77.5945)
        ],
        lineOptions: {
            styles: [{ color: "#6FA1EC", weight: 4 }]
        },
        show: false,
        collapsible: false,
        addWaypoints: false,
        routeWhileDragging: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false
    });

    return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;