import L from "leaflet";
import "leaflet-routing-machine";
import { createControlComponent } from "@react-leaflet/core";

const createRoutineMachineLayer = ({coords}) => {
    const instance = L.Routing.control({
        waypoints: coords,
        lineOptions: {
            styles: [{ color: "#AEF359", weight: 6 }]
        },
        show: false,
        collapsible: false,
        addWaypoints: false,
        routeWhileDragging: false,
        draggableWaypoints: false,
        fitSelectedRoutes: false,
        showAlternatives: false
    });

    return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;