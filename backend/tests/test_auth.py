def test_health_check(client):
    res = client.get('/api/health')
    assert res.status_code == 200
    data = res.get_json()
    assert data["status"] == "healthy"

def test_login_success(client):
    payload = {
        "email": "anshika@example.com",
        "password": "password123"
    }
    res = client.post('/api/auth/login', json=payload)
    assert res.status_code == 200
    data = res.get_json()
    assert "access_token" in data
    assert data["user"]["email"] == "anshika@example.com"

def test_login_failure(client):
    payload = {
        "email": "invalid@example.com",
        "password": "wrongpassword"
    }
    res = client.post('/api/auth/login', json=payload)
    assert res.status_code == 401
    assert "error" in res.get_json()

def test_signup_success(client):
    payload = {
        "name": "New User",
        "email": "newuser@example.com",
        "password": "password123"
    }
    res = client.post('/api/auth/signup', json=payload)
    assert res.status_code == 201
    data = res.get_json()
    assert "access_token" in data
    assert data["user"]["name"] == "New User"
