import React, { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { Link } from "react-router-dom";
import { Search, MapPin, Star, LocateFixed } from "lucide-react";
import api from "./api";

// Vite does not automatically resolve Leaflet's default marker image paths.
const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41]
});
function FitMarkers({ places }) {
  const map = useMap();
  useEffect(() => {
    if (!places.length) return;
    const bounds = L.latLngBounds(places.map(p => [p.latitude, p.longitude]));
    map.fitBounds(bounds, { padding: [35, 35], maxZoom: 6 });
  }, [places, map]);
  return null;
}
export default function ExploreMap() {
  const [places, setPlaces] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    api.get("/destinations").then(r => setPlaces(r.data.filter(p => Number.isFinite(p.latitude) && Number.isFinite(p.longitude))))
      .catch(() => setError("Could not load destinations. Check that the backend and MongoDB are running."))
      .finally(() => setLoading(false));
  }, []);
  const filtered = useMemo(() => places.filter(p => {
    const text = `${p.name} ${p.country} ${p.region}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (category === "All" || p.category?.includes(category));
  }), [places, query, category]);
  return <main className="page map-page">
    <div className="page-intro"><span className="eyebrow">EXPLORE THE WORLD</span><h1>Explore on the map</h1><p>Discover 100 curated destinations across India. Select a marker to learn more.</p></div>
    <div className="map-toolbar">
      <div className="input-icon"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search destination, state..."/></div>
      <select value={category} onChange={e=>setCategory(e.target.value)} aria-label="Filter category">{["All","Beach","Culture","Adventure","Nature","History","City"].map(c=><option key={c}>{c}</option>)}</select>
      <span className="map-count"><MapPin size={15}/> {filtered.length} places</span>
    </div>
    {error && <div className="error">{error}</div>}
    {loading ? <div className="loading">Loading map destinations...</div> : <div className="map-layout">
      <section className="map-canvas"><MapContainer center={[22.5, 79]} zoom={4} scrollWheelZoom={true}>
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <FitMarkers places={filtered}/>
        {filtered.map(p=><Marker key={p._id} position={[p.latitude,p.longitude]} icon={markerIcon}><Popup><div className="map-popup"><img src={p.image} alt={p.name}/><b>{p.name}</b><span>{p.region}, {p.country}</span><Link to={`/destination/${p._id}`}>View destination →</Link></div></Popup></Marker>)}
      </MapContainer></section>
      <aside className="map-results"><div className="map-results-head"><b>Destinations</b><span>{filtered.length} found</span></div>{filtered.slice(0,30).map(p=><Link className="map-result" to={`/destination/${p._id}`} key={p._id}><img src={p.image} alt=""/><span><b>{p.name}</b><small>{p.region}, India</small></span><span className="rating"><Star size={13} fill="currentColor"/>{Number(p.rating||0).toFixed(1)}</span></Link>)}{filtered.length>30&&<small className="map-more">Showing first 30 results. Use search to narrow the list.</small>}{!filtered.length&&<p className="empty">No destinations match your filters.</p>}</aside>
    </div>}
    <p className="map-attribution"><LocateFixed size={14}/> Map data © OpenStreetMap contributors. Destination pins use approximate area coordinates for discovery; confirm exact locations before travelling.</p>
  </main>;
}
