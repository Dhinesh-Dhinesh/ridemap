import { useMapEvents } from 'react-leaflet'

export default function ToggleBusScroll({ callback }) {
    useMapEvents({
        click() {
            callback((prev) => !prev);
        },
    })
    return null;
}