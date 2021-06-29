import { Marker, Popup, TileLayer, MapContainer } from "react-leaflet";
import './MapComponent.scss'

export function MapComponent() {
  return (
    <div className="content">
      <div className="map">
        <MapContainer center={[-23.5606439, -46.6337867]} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[-23.5606439, -46.6337867]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}