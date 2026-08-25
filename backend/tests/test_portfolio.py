def test_portfolio_crud(client):
    # 1. Create Portfolio
    create_res = client.post('/api/portfolios', json={
        "name": "My New Portfolio",
        "themeId": "minimal"
    })
    assert create_res.status_code == 201
    port = create_res.get_json()
    assert port["name"] == "My New Portfolio"
    port_id = port["id"]

    # 2. Get Portfolio
    get_res = client.get(f'/api/portfolios/{port_id}')
    assert get_res.status_code == 200
    assert get_res.get_json()["id"] == port_id

    # 3. Update Portfolio
    update_res = client.put(f'/api/portfolios/{port_id}', json={
        "name": "Updated Portfolio Name",
        "status": "published"
    })
    assert update_res.status_code == 200
    assert update_res.get_json()["name"] == "Updated Portfolio Name"

    # 4. Delete Portfolio
    delete_res = client.delete(f'/api/portfolios/{port_id}')
    assert delete_res.status_code == 200

def test_get_themes(client):
    res = client.get('/api/themes')
    assert res.status_code == 200
    themes = res.get_json()
    assert len(themes) >= 6
