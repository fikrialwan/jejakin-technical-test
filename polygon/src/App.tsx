import { LatLngExpression } from "leaflet";
import { Dispatch, SetStateAction, useState } from "react";
import { MapContainer, Polygon, TileLayer, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface IMapActionComponentProps {
  isUpdate: boolean;
  listPolygon: LatLngExpression[][];
  polygonMarkerTemp: LatLngExpression[];
  setPolygonMarkerTemp: Dispatch<SetStateAction<LatLngExpression[]>>;
}

const MapActionComponent = ({
  isUpdate,
  listPolygon,
  polygonMarkerTemp,
  setPolygonMarkerTemp,
}: IMapActionComponentProps) => {
  const map = useMapEvent("click", (event) => {
    if (isUpdate) {
      setPolygonMarkerTemp((prev) => [
        ...prev,
        [event.latlng.lat, event.latlng.lng],
      ]);
    } else {
      map.setView(event.latlng, map.getZoom());
    }
  });

  return (
    <>
      {listPolygon.map((polygon, index) => (
        <Polygon key={index} positions={polygon} />
      ))}
      <Polygon positions={polygonMarkerTemp} />
    </>
  );
};

function App() {
  const [polygonMarkerTemp, setPolygonMarkerTemp] = useState<
    LatLngExpression[]
  >([]);
  const [listPolygon, setListPolygon] = useState<LatLngExpression[][]>([]);
  const [isUpdate, setUpdate] = useState<boolean>(false);

  const handleAction = () => {
    if (isUpdate) {
      setListPolygon((prev) => [...prev, polygonMarkerTemp]);
      setPolygonMarkerTemp([]);
      setUpdate(false);
    } else {
      setUpdate(true);
    }
  };

  return (
    <>
      <button
        className="bg-white text-black rounded py-2 px-3 fixed bottom-6 right-2 z-50"
        onClick={handleAction}
      >
        {isUpdate ? "Save" : "Add polygon"}
      </button>
      <div className="w-screen h-screen fixed z-10">
        <MapContainer
          className="h-full w-full"
          center={[-6.2730152, 106.7137589]}
          zoom={20}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapActionComponent
            isUpdate={isUpdate}
            listPolygon={listPolygon}
            polygonMarkerTemp={polygonMarkerTemp}
            setPolygonMarkerTemp={setPolygonMarkerTemp}
          />

          <Polygon
            positions={[
              [-6.272499, 106.713857],
              [-6.272661, 106.713935],
              [-6.273955, 106.71382],
              [-6.273092, 106.712039],
            ]}
          />
        </MapContainer>
      </div>
    </>
  );
}

export default App;
