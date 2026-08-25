def test_export_portfolio_html(client):
    res = client.post('/api/portfolios/generate', json={
        "theme": "bento",
        "portfolioJSON": {
            "name": "Anshika Bansal",
            "title": "Computer Science Engineer",
            "skills": ["Python", "Flask", "React"]
        }
    })
    assert res.status_code == 200
    assert res.mimetype == "text/html"
    html_text = res.get_data(as_text=True)
    assert "<!DOCTYPE html>" in html_text
    assert "Anshika Bansal" in html_text
