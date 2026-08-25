from flask import Blueprint, request, jsonify
from services.resume_service import resume_service

resume_bp = Blueprint('resume', __name__, url_prefix='/api/resume')

@resume_bp.route('/upload', methods=['POST'])
def upload_resume():
    if 'file' in request.files:
        file = request.files['file']
        if file.filename == '':
            return jsonify({"error": "No file selected"}), 400
        content = file.read()
        result = resume_service.upload_resume(file.filename, content)
        return jsonify(result), 201
    
    # Accept JSON raw text fallback
    data = request.get_json() or {}
    text = data.get("text", "")
    filename = data.get("filename", "resume.txt")
    if not text:
        return jsonify({"error": "No file or text payload provided"}), 400

    result = resume_service.upload_resume(filename, text.encode("utf-8"))
    return jsonify(result), 201

@resume_bp.route('/analyze', methods=['POST'])
def analyze_resume():
    data = request.get_json() or {}
    resume_id = data.get("resumeId", "")
    result = resume_service.analyze_resume(resume_id)
    return jsonify(result), 200

@resume_bp.route('/<resume_id>', methods=['GET'])
def get_resume_text(resume_id):
    text = resume_service.get_resume_text(resume_id)
    if not text:
        return jsonify({"error": "Resume text not found"}), 404
    return jsonify({"id": resume_id, "text": text}), 200
