from flask import Blueprint, jsonify
from services.portfolio_service import portfolio_service

themes_bp = Blueprint('themes', __name__, url_prefix='/api/themes')

@themes_bp.route('', methods=['GET'])
def get_themes():
    themes = portfolio_service.get_themes()
    return jsonify(themes), 200
