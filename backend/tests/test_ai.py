def test_ai_generate_prompt(client):
    res = client.post('/api/ai/generate-prompt', json={
        "name": "Anshika Bansal",
        "title": "AI Engineer",
        "skills": ["Python", "FastAPI"]
    })
    assert res.status_code == 200
    data = res.get_json()
    assert "prompt" in data
    assert "Anshika Bansal" in data["prompt"]

def test_ai_generate_json(client):
    res = client.post('/api/ai/generate-json', json={
        "resumeText": "Anshika Bansal\nComputer Science Student\nSkills: Python, React, SQL"
    })
    assert res.status_code == 200
    data = res.get_json()
    assert "name" in data
    assert "skills" in data
    assert "projects" in data

def test_ai_enhance_section(client):
    res = client.post('/api/ai/enhance-section', json={
        "section": "experience",
        "text": "Created backend APIs for web app"
    })
    assert res.status_code == 200
    data = res.get_json()
    assert "enhancedText" in data
