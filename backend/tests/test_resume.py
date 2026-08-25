def test_resume_upload_and_analyze(client):
    upload_res = client.post('/api/resume/upload', json={
        "filename": "my_resume.txt",
        "text": "ANSHIKA BANSAL\nComputer Science Student\nSKILLS: Python, React, Flask\nEDUCATION: B.Tech CS"
    })
    assert upload_res.status_code == 201
    res_data = upload_res.get_json()
    assert "id" in res_data
    
    resume_id = res_data["id"]
    analyze_res = client.post('/api/resume/analyze', json={"resumeId": resume_id})
    assert analyze_res.status_code == 200
    an_data = analyze_res.get_json()
    assert "score" in an_data
    assert "sections" in an_data
    assert isinstance(an_data["score"], int)
