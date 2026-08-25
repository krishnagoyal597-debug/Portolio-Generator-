def test_admin_stats(client):
    res = client.get('/api/admin/stats')
    assert res.status_code == 200
    data = res.get_json()
    assert "totalUsers" in data
    assert "totalPortfolios" in data

def test_admin_users(client):
    res = client.get('/api/admin/users')
    assert res.status_code == 200
    data = res.get_json()
    assert "users" in data
    assert len(data["users"]) > 0

def test_admin_analytics(client):
    res = client.get('/api/admin/analytics?period=month')
    assert res.status_code == 200
    data = res.get_json()
    assert data["period"] == "month"
    assert "metrics" in data
