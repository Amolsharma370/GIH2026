/** Extract Leaflet LatLngs from GeoJSON Polygon. GeoJSON = [lng,lat], Leaflet = [lat,lng]. */
export function geojsonPolygonToLatLngs(geometry) {
  if (!geometry) return [];
  if (geometry.type === "Polygon") {
    // Leaflet supports nested arrays for polygons with holes
    return geometry.coordinates.map(ring => ring.map(([lng, lat]) => [lat, lng]));
  }
  if (geometry.type === "MultiPolygon") {
    return geometry.coordinates.map(poly => poly.map(ring => ring.map(([lng, lat]) => [lat, lng])));
  }
  return [];
}

export function getCenterFromGeometry(geometry) {
  if (!geometry) return null;
  let coords = [];
  if (geometry.type === "Polygon") coords = geometry.coordinates[0];
  else if (geometry.type === "MultiPolygon") coords = geometry.coordinates[0][0];
  else return null;

  const lng = coords.reduce((sum, c) => sum + c[0], 0) / coords.length;
  const lat = coords.reduce((sum, c) => sum + c[1], 0) / coords.length;
  return { lat, lng };
}
