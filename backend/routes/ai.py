from flask import Blueprint, request, jsonify
from services.ai_service import ai_service
from services.resume_service import resume_service

ai_bp = Blueprint('ai', __name__, url_prefix='/api/ai')

@ai_bp.route('/generate-prompt', methods=['POST'])
def generate_prompt():
    data = request.get_json() or {}
    portfolio_data = data.get("portfolioData", data)
    prompt = ai_service.generate_prompt(portfolio_data)
    return jsonify({"prompt": prompt}), 200

@ai_bp.route('/generate-json', methods=['POST'])
def generate_json():
    data = request.get_json() or {}
    resume_text = data.get("resumeText") or data.get("prompt") or ""
    resume_id = data.get("resumeId")
    
    if resume_id and not resume_text:
        resume_text = resume_service.get_resume_text(resume_id)
        
    if not resume_text:
        resume_text = "ANSHIKA BANSAL\nComputer Science & AI Engineer\nSkills: Python, React, FastAPI, TensorFlow"
        
    structured_json = ai_service.generate_json_from_resume(resume_text)
    return jsonify(structured_json), 200

@ai_bp.route('/enhance-section', methods=['POST'])
def enhance_section():
    data = request.get_json() or {}
    section = data.get("section", "experience")
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "Missing text to enhance"}), 400
        
    enhanced = ai_service.enhance_section(section, text)
    return jsonify({"section": section, "enhancedText": enhanced}), 200
