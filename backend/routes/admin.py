from flask import Blueprint, request, jsonify
from services.admin_service import admin_service

admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')

@admin_bp.route('/stats', methods=['GET'])
def get_stats():
    stats = admin_service.get_stats()
    return jsonify(stats), 200

@admin_bp.route('/users', methods=['GET'])
def get_users():
    search = request.args.get('search', '')
    status = request.args.get('status', 'all')
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 10))
    
    result = admin_service.get_users(search=search, status=status, page=page, limit=limit)
    return jsonify(result), 200

@admin_bp.route('/users/<user_id>/suspend', methods=['PUT'])
def suspend_user(user_id):
    success = admin_service.suspend_user(user_id)
    if not success:
        return jsonify({"error": f"User {user_id} not found"}), 404
    return jsonify({"success": True, "id": user_id, "status": "suspended"}), 200

@admin_bp.route('/users/<user_id>/activate', methods=['PUT'])
def activate_user(user_id):
    success = admin_service.activate_user(user_id)
    if not success:
        return jsonify({"error": f"User {user_id} not found"}), 404
    return jsonify({"success": True, "id": user_id, "status": "active"}), 200

@admin_bp.route('/users/<user_id>', methods=['DELETE'])
def delete_user(user_id):
    success = admin_service.delete_user(user_id)
    if not success:
        return jsonify({"error": f"User {user_id} not found"}), 404
    return jsonify({"success": True, "id": user_id}), 200

@admin_bp.route('/portfolios', methods=['GET'])
def get_admin_portfolios():
    search = request.args.get('search', '')
    theme = request.args.get('theme', 'all')
    status = request.args.get('status', 'all')
    
    ports = admin_service.get_admin_portfolios(search=search, theme=theme, status=status)
    return jsonify(ports), 200

@admin_bp.route('/analytics', methods=['GET'])
def get_analytics():
    period = request.args.get('period', 'month')
    analytics = admin_service.get_analytics(period=period)
    return jsonify(analytics), 200
