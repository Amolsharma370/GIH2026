# ml-service — Hazard Model Bridge

This FastAPI service is the **swap point** between the mock provider and your real hazard model.

## Run

```bash
pip install -r requirements.txt
uvicorn app:app --reload --port 8000
```

## Contract

POST `/compute` accepts:
```json
{
  "center": {"lat": 23.2752, "lng": 77.4063},
  "chemicalName": "Methyl isocyanate (MIC)",
  "quantityKg": 1000,
  "windSpeedMs": 2,
  "windDirectionDeg": 190,
  "stabilityClass": "F"
}
```

And returns the full zone GeoJSON contract (see root README).

## Roadmap to the real model

When the real model is ready, replace the stub in `app.py` `compute()` function with:
1. STAC imagery fetch for the given center coordinate (Sentinel-2 scene)
2. Agentic AI zone-radius estimation from the scene + scenario inputs
3. Shapely `unary_union` of the computed polygons
4. Return the exact contract shape above

Nothing else in this codebase needs to change — `server/src/providers/pythonModelProvider.js`
already POSTs to this endpoint and forwards the response.
