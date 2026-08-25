from flask import Blueprint, request, jsonify
from services.auth_service import auth_service
from models.pydantic_models import UserSignup, UserLogin

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/signup', methods=['POST'])
def signup():
    data = request.get_json() or {}
    try:
        req = UserSignup(**data)
        result = auth_service.signup(req.name, req.email, req.password)
        return jsonify(result), 201
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        return jsonify({"error": "Invalid registration request", "details": str(e)}), 422

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    try:
        req = UserLogin(**data)
        result = auth_service.login(req.email, req.password)
        return jsonify(result), 200
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 401
    except Exception as e:
        return jsonify({"error": "Invalid login request", "details": str(e)}), 422

@auth_bp.route('/me', methods=['GET'])
def me():
    auth_header = request.headers.get('Authorization', '')
    if not auth_header.startswith('Bearer '):
        return jsonify({"error": "Missing or invalid token"}), 401
        
    token = auth_header.split(' ')[1]
    decoded = auth_service.decode_token(token)
    if not decoded:
        return jsonify({"error": "Expired or invalid token"}), 401
        
    user = auth_service.get_user_by_id(decoded.get("sub")) or decoded.get("user")
    if not user:
        return jsonify({"error": "User not found"}), 404
        
    return jsonify(user), 200

@auth_bp.route('/logout', methods=['POST'])
def logout():
    return jsonify({"success": True, "message": "Logged out successfully"}), 200
