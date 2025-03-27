import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function App() {
  return (
    <div className="w-screen h-screen fixed">
      <MapContainer
        center={[-6.2730152, 106.7137589]}
        zoom={20}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={[-6.2730152, 106.7137589]}>
          <Popup>
            <div className="flex gap-4">
              <img src="/thumbnail.jpeg" className="w-25 h-auto rounded" />
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">
                  <img
                    src="/jejakin.svg"
                    className="w-20 h-auto"
                    alt="jejakin"
                  />
                </h1>
                <address className="text-sm not-italic">
                  Kebayoran Square A08, Pondok Jaya, Pondok Aren, South
                  Tangerang City, Banten
                </address>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;
