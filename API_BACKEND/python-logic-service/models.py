from pydantic import BaseModel, ConfigDict, Field, field_validator
from typing import List, Optional

class PriorityRequest(BaseModel):
    people: int = Field(ge=0, description="Number of people impacted")
    urgency: str = Field(description="low, medium, or high")
    availableVolunteers: int = Field(ge=0, description="Available volunteers count")
    timestamp: str = Field(description="ISO 8601 Timestamp format")

    @field_validator('urgency')
    @classmethod
    def validate_urgency(cls, v: str) -> str:
        v_low = v.lower()
        if v_low not in ['low', 'medium', 'high']:
            raise ValueError('urgency must be low, medium, or high')
        return v_low

class Volunteer(BaseModel):
    name: str = Field(min_length=1)
    skills: List[str]
    location: str
    availability: bool

class MatchRequest(BaseModel):
    location: str
    requiredSkills: List[str]
    volunteers: List[Volunteer]

class PriorityResponse(BaseModel):
    score: float
    reasoning: dict
    fallbackUsed: bool = False
    message: Optional[str] = None

class MatchResult(BaseModel):
    name: str
    skills: List[str]
    location: str
    availability: bool
    matchScore: float

class MatchResponse(BaseModel):
    matches: List[MatchResult]
    reasoning: dict
    fallbackUsed: bool = False
    message: Optional[str] = None
