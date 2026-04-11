from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from models import PriorityRequest, MatchRequest, PriorityResponse, MatchResponse
from services import ScoringService, MatchingService

app = FastAPI(title="Intelligent Matching Microservice", version="1.1.0")

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    return JSONResponse(
        status_code=400,
        content={"message": "Validation Error", "details": exc.errors()}
    )

@app.post("/priority-score", response_model=PriorityResponse)
def calculate_priority_score(req: PriorityRequest):
    return ScoringService.calculate_priority(req)

@app.post("/optimize-match", response_model=MatchResponse)
def optimize_match(req: MatchRequest):
    return MatchingService.optimize_match(req)
