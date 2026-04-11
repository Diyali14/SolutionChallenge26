from fastapi.testclient import TestClient
from main import app
from datetime import datetime, timezone

client = TestClient(app)

def test_priority_score_normal():
    now_iso = datetime.now(timezone.utc).isoformat()
    response = client.post("/priority-score", json={
        "people": 75,
        "urgency": "medium",
        "availableVolunteers": 20,
        "timestamp": now_iso
    })
    assert response.status_code == 200
    data = response.json()
    assert data["score"] > 0
    assert "people_impact" in data["reasoning"]

def test_priority_score_zero_volunteers():
    response = client.post("/priority-score", json={
        "people": 10,
        "urgency": "high",
        "availableVolunteers": 0,
        "timestamp": "2026-04-02T10:00:00Z"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["score"] == 100.0
    assert data["reasoning"]["override"] == "Zero available volunteers forces maximum priority."

def test_priority_invalid_urgency():
    response = client.post("/priority-score", json={
        "people": 10,
        "urgency": "SUPER_HIGH",
        "availableVolunteers": 5,
        "timestamp": "2026-04-02T10:00:00Z"
    })
    assert response.status_code == 400

def test_priority_negative_people():
    response = client.post("/priority-score", json={
        "people": -5,
        "urgency": "high",
        "availableVolunteers": 5,
        "timestamp": "2026-04-02T10:00:00Z"
    })
    assert response.status_code == 400

def test_optimize_match_exact_skill_and_location():
    response = client.post("/optimize-match", json={
        "location": "NY",
        "requiredSkills": ["A", "B"],
        "volunteers": [
            {"name": "John", "skills": ["a", "b"], "location": "ny", "availability": True},
            {"name": "Doe", "skills": ["c"], "location": "ny", "availability": True}
        ]
    })
    assert response.status_code == 200
    res = response.json()
    assert res["matches"][0]["name"] == "John"
    assert res["matches"][0]["matchScore"] == 10.0

def test_optimize_match_partial_skill():
    response = client.post("/optimize-match", json={
        "location": "LA",
        "requiredSkills": ["Medic", "Driver"],
        "volunteers": [
            {"name": "V1", "skills": ["Medic"], "location": "LA", "availability": True}
        ]
    })
    assert response.status_code == 200
    res = response.json()
    # Medic partial match (5 * 0.5) + location (10 * 0.3) + diff (10 * 0.2) = 2.5 + 3.0 + 2.0 = 7.5
    assert res["matches"][0]["matchScore"] == 7.5

def test_optimize_match_no_availability():
    response = client.post("/optimize-match", json={
        "location": "NY",
        "requiredSkills": ["A"],
        "volunteers": [
            {"name": "Bob", "skills": ["A"], "location": "NY", "availability": False}
        ]
    })
    assert response.status_code == 200
    res = response.json()
    # Skill (10*0.5=5) + Location (10*0.3=3) + Avail (0*0.2=0) = 8
    assert res["matches"][0]["matchScore"] == 8.0

def test_optimize_match_top_limit():
    vols = [{"name": f"V{i}", "skills": ["A"], "location": "NY", "availability": True} for i in range(10)]
    response = client.post("/optimize-match", json={
        "location": "NY",
        "requiredSkills": ["A"],
        "volunteers": vols
    })
    assert response.status_code == 200
    res = response.json()
    assert len(res["matches"]) == 5
