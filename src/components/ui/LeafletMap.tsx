import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface LeafletMapProps {
    center: [number, number];
    zoom?: number;
    markers?: {
        lat: number;
        lng: number;
        title: string;
    }[];
    className?: string;
}

const LeafletMap: React.FC<LeafletMapProps> = ({ center, zoom = 15, markers = [], className = "h-full w-full" }) => {
    return (
        <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} className={className} style={{ zIndex: 0 }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers.map((marker, idx) => (
                <Marker key={idx} position={[marker.lat, marker.lng]}>
                    <Popup>
                        {marker.title}
                    </Popup>
                </Marker>
            ))}
            {/* If no markers provided but we have a center, show a marker at center */}
            {markers.length === 0 && (
                <Marker position={center}>
                    <Popup>Lokasi</Popup>
                </Marker>
            )}
        </MapContainer>
    );
};

export default LeafletMap;
