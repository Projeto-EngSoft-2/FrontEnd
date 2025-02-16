import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLocation, useNavigate } from "react-router-dom";
import L from "leaflet";
import gpsIcon from "../assets/gps-icon.png"; 


const Mapa = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const localizacao = location.state?.localizacao || null;

  // Criando o ícone do GPS personalizado
  const gpsMarker = new L.Icon({
    iconUrl: gpsIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  // Se não houver localização, mostramos uma mensagem
  if (!localizacao) {
    return (
      <div className="mapa-container">
        <h3>Nenhuma localização foi fornecida</h3>
        <button onClick={() => navigate("/")}>Voltar para Home</button>
      </div>
    );
  }

  // Extraindo latitude e longitude da string "Lat: XX, Lng: YY"
  const [lat, lng] = localizacao.match(/-?\d+\.\d+/g).map(Number);

  return (
    <div className="mapa-container">
      <h2>Localização da Denúncia</h2>
      <MapContainer center={[lat, lng]} zoom={15} style={{ height: "400px", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[lat, lng]} icon={gpsMarker}>
          <Popup>Local da denúncia</Popup>
        </Marker>
      </MapContainer>
      <button onClick={() => navigate("/")}>Voltar para Home</button>
    </div>
  );
};

export default Mapa;