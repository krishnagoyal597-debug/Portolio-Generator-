import os
import sys

# Ensure backend root directory is in sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from flask import Flask, jsonify
from flask_cors import CORS
from config import config

from routes.auth import auth_bp
from routes.resume import resume_bp
from routes.ai import ai_bp
from routes.portfolio import portfolio_bp
from routes.themes import themes_bp
from routes.admin import admin_bp

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = config.SECRET_KEY

    # Enable CORS for frontend cross-origin access
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Register Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(resume_bp)
    app.register_blueprint(ai_bp)
    app.register_blueprint(portfolio_bp)
    app.register_blueprint(themes_bp)
    app.register_blueprint(admin_bp)

    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({
            "status": "healthy",
            "service": "PortfolioForge Flask Backend API",
            "version": "1.0.0",
            "environment": config.FLASK_ENV
        }), 200

    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"error": "Resource not found"}), 404

    @app.errorhandler(500)
    def server_error(e):
        return jsonify({"error": "Internal server error", "details": str(e)}), 500

    return app

app = create_app()

if __name__ == '__main__':
    print(f"Starting Flask server on port {config.PORT}...")
    app.run(host='0.0.0.0', port=config.PORT, debug=(config.FLASK_ENV == 'development'))
