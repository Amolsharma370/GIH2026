"""
ml-service/app.py — FastAPI stub for the hazard model bridge.

This is the seam between the Express backend and the real Python model.
See README.md for the roadmap to the real implementation.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import datetime

from models.blast_model import compute_zones

app = FastAPI(title="Sentinelzone ML Service", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class ComputeRequest(BaseModel):
    scenarioId: Optional[str] = None
    center: dict  # {lat: float, lng: float}
    chemicalName: str = "Unknown chemical"
    releaseType: str = "toxic_gas"
    quantityKg: Optional[float] = None
    windSpeedMs: float = 2.0
    windDirectionDeg: float = 0.0
    stabilityClass: str = "D"


@app.get("/health")
async def health():
    return {"status": "ok", "service": "sentinelzone-ml"}


@app.post("/compute")
async def compute(req: ComputeRequest):
    """
    ROADMAP: Replace body with real pipeline:
      1. STAC fetch Sentinel-2 imagery for req.center
      2. Agentic AI zone-radius estimation
      3. Shapely unary_union for merged polygons
      4. Return exact contract shape below
    """
    try:
        zones = compute_zones(
            lat=req.center["lat"],
            lng=req.center["lng"],
            chemical_name=req.chemicalName,
            quantity_kg=req.quantityKg,
            wind_speed_ms=req.windSpeedMs,
            wind_direction_deg=req.windDirectionDeg,
            stability_class=req.stabilityClass,
        )

        scenario_id = req.scenarioId or f"python-{datetime.datetime.utcnow().strftime('%Y%m%dT%H%M%S')}"

        return {
            "scenarioId": scenario_id,
            "meta": {
                "name": f"Analysis: {req.chemicalName}",
                "facility": "User-specified facility",
                "center": req.center,
                "epicenters": [
                    req.center,
                    {"lat": req.center["lat"] - 0.001, "lng": req.center["lng"] - 0.0005},
                    {"lat": req.center["lat"] - 0.0008, "lng": req.center["lng"] + 0.001}
                ],
                "hazardType": req.releaseType,
                "isHistoricalDemo": False,
                "generatedBy": "ml-service-stub-v0",
                "timestamp": datetime.datetime.utcnow().isoformat() + "Z",
            },
            "inputs": {
                "chemicalName": req.chemicalName,
                "releaseType": req.releaseType,
                "quantityKg": req.quantityKg,
                "windSpeedMs": req.windSpeedMs,
                "windDirectionDeg": req.windDirectionDeg,
                "stabilityClass": req.stabilityClass,
            },
            "zones": zones,
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
