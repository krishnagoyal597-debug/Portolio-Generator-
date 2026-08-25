from flask import Blueprint, request, jsonify, Response
from services.portfolio_service import portfolio_service
from services.export_service import export_service
from models.pydantic_models import PortfolioCreate, PortfolioUpdate

from services.auth_service import auth_service

portfolio_bp = Blueprint('portfolio', __name__, url_prefix='/api/portfolios')

def get_auth_user():
    auth_header = request.headers.get('Authorization', '')
    if auth_header.startswith('Bearer '):
        token = auth_header.split(' ')[1]
        decoded = auth_service.decode_token(token)
        if decoded:
            return decoded
    return None

@portfolio_bp.route('', methods=['GET'])
def get_portfolios():
    auth_user = get_auth_user()
    user_id = (auth_user.get("sub") if auth_user else None) or request.args.get('userId')
    ports = portfolio_service.get_portfolios(user_id)
    return jsonify(ports), 200

@portfolio_bp.route('/<portfolio_id>', methods=['GET'])
def get_portfolio(portfolio_id):
    port = portfolio_service.get_portfolio(portfolio_id)
    if not port:
        return jsonify({"error": f"Portfolio {portfolio_id} not found"}), 404
    return jsonify(port), 200

@portfolio_bp.route('/public/<portfolio_id>', methods=['GET'])
def get_public_portfolio(portfolio_id):
    port = portfolio_service.get_portfolio(portfolio_id)
    if not port:
        return jsonify({"error": "Portfolio not found"}), 404
    # Increment view count
    port["views"] = port.get("views", 0) + 1
    return jsonify(port), 200

@portfolio_bp.route('', methods=['POST'])
def create_portfolio():
    data = request.get_json() or {}
    try:
        req = PortfolioCreate(**data)
        auth_user = get_auth_user()
        user_id = (auth_user.get("sub") if auth_user else None) or data.get("userId", "u1")
        port = portfolio_service.create_portfolio(
            user_id=user_id,
            name=req.name,
            theme_id=req.themeId,
            data=req.data.model_dump() if req.data else {},
            appearance=req.appearance.model_dump() if req.appearance else None
        )
        return jsonify(port), 201
    except Exception as e:
        return jsonify({"error": "Failed to create portfolio", "details": str(e)}), 400

@portfolio_bp.route('/<portfolio_id>', methods=['PUT'])
def update_portfolio(portfolio_id):
    data = request.get_json() or {}
    try:
        port = portfolio_service.update_portfolio(portfolio_id, data)
        return jsonify(port), 200
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 404
    except Exception as e:
        return jsonify({"error": "Failed to update portfolio", "details": str(e)}), 400

@portfolio_bp.route('/<portfolio_id>', methods=['DELETE'])
def delete_portfolio(portfolio_id):
    success = portfolio_service.delete_portfolio(portfolio_id)
    if not success:
        return jsonify({"error": f"Portfolio {portfolio_id} not found"}), 404
    return jsonify({"success": True, "id": portfolio_id}), 200

@portfolio_bp.route('/<portfolio_id>/publish', methods=['POST'])
def publish_portfolio(portfolio_id):
    try:
        port = portfolio_service.publish_portfolio(portfolio_id)
        return jsonify(port), 200
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 404

@portfolio_bp.route('/<portfolio_id>/duplicate', methods=['POST'])
def duplicate_portfolio(portfolio_id):
    try:
        port = portfolio_service.duplicate_portfolio(portfolio_id)
        return jsonify(port), 201
    except ValueError as ve:
        return jsonify({"error": str(ve)}), 404

@portfolio_bp.route('/<portfolio_id>/export', methods=['POST', 'GET'])
@portfolio_bp.route('/generate', methods=['POST'])
def export_portfolio_html(portfolio_id=None):
    data = request.get_json() or {}
    theme = data.get("theme", data.get("themeId", "bento"))
    
    portfolio_data = data.get("portfolioJSON") or data.get("data") or {}
    
    if portfolio_id and not portfolio_data:
        port = portfolio_service.get_portfolio(portfolio_id)
        if port:
            portfolio_data = port.get("data", {})
            theme = port.get("themeId", theme)

    if not portfolio_data:
        # Fallback default portfolio JSON for demo export
        from data.mockData import mockPortfolioJSON
        portfolio_data = mockPortfolioJSON

    html_content = export_service.generate_html(portfolio_data, theme)
    
    return Response(
        html_content,
        mimetype="text/html",
        headers={"Content-Disposition": "attachment; filename=portfolio.html"}
    )
