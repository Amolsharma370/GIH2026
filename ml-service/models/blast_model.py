import math
from typing import List, Dict
from pydantic import BaseModel
from shapely.geometry import Polygon, mapping
from shapely.ops import unary_union

class ComputeRequest(BaseModel):
    scenarioId: str | None = None
    center: dict  # {lat: float, lng: float}
    chemicalName: str = "Unknown chemical"
    releaseType: str = "toxic_gas"
    quantityKg: float | None = None
    windSpeedMs: float = 2.0
    windDirectionDeg: float = 0.0
    stabilityClass: str = "D"

ZONE_META = [
    {"severity": 1, "label": "0.1 bar overpressure", "colorHex": "#4C8DFF"},
    {"severity": 2, "label": "0.2 bar overpressure", "colorHex": "#3DD68C"},
    {"severity": 3, "label": "0.3 bar overpressure", "colorHex": "#F2C230"},
    {"severity": 4, "label": "0.5 bar overpressure", "colorHex": "#F2543D"},
    {"severity": 5, "label": "1.0 bar overpressure", "colorHex": "#29D4D4"},
    {"severity": 6, "label": "2.0 bar overpressure", "colorHex": "#E14FD4"},
]

BASE_RADII = [800, 500, 320, 180, 90, 45]

def _circle_polygon_shapely(lat: float, lng: float, radius_m: float, n_points: int = 64) -> Polygon:
    coords = []
    for i in range(n_points + 1):
        angle = 2 * math.pi * i / n_points
        dx = radius_m * math.cos(angle)
        dy = radius_m * math.sin(angle)
        # Approximate conversion from meters to degrees at this latitude
        dlng = dx / (111320 * math.cos(math.radians(lat)))
        dlat = dy / 110540
        coords.append((lng + dlng, lat + dlat))
    return Polygon(coords)

def compute_zones(lat: float, lng: float, chemical_name: str, quantity_kg: float | None, wind_speed_ms: float, wind_direction_deg: float, stability_class: str) -> List[Dict]:
    scale = 1.0
    if quantity_kg:
        scale = math.pow(quantity_kg / 1000.0, 1.0/3.0)
        
    zones = []
    
    # FIXED physical offsets for the 3 tanks (so they don't move when radius grows)
    lat1, lng1 = lat, lng
    lat2, lng2 = lat - 0.001, lng - 0.0005  # Tank 2: South-West
    lat3, lng3 = lat - 0.0008, lng + 0.001   # Tank 3: South-East
    
    for i, meta in enumerate(ZONE_META):
        r = BASE_RADII[i] * scale
        
        poly1 = _circle_polygon_shapely(lat1, lng1, r)
        poly2 = _circle_polygon_shapely(lat2, lng2, r * 0.85)
        poly3 = _circle_polygon_shapely(lat3, lng3, r * 0.8)
        
        # Merge all three circles into one continuous shape!
        merged = unary_union([poly1, poly2, poly3])
        
        zones.append({
            "id": f"z{meta['severity']}",
            **meta,
            "radiusM": round(r),
            "geometry": mapping(merged) # Automatically converts shapely to GeoJSON
        })
        
    return zones
