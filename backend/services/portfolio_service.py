import uuid
from datetime import datetime
from typing import List, Dict, Any
from db import db_manager

class PortfolioService:
    def get_portfolios(self, user_id: str = None) -> List[Dict[str, Any]]:
        ports = list(db_manager._portfolios.values())
        if user_id:
            ports = [p for p in ports if p.get("userId") == user_id]
        return ports

    def get_portfolio(self, portfolio_id: str) -> Dict[str, Any]:
        return db_manager._portfolios.get(portfolio_id)

    def create_portfolio(self, user_id: str, name: str, theme_id: str = "bento", data: dict = None, appearance: dict = None) -> Dict[str, Any]:
        portfolio_id = f"port-{uuid.uuid4().hex[:8]}"
        now = datetime.utcnow().isoformat() + "Z"
        
        new_port = {
            "id": portfolio_id,
            "userId": user_id or "u1",
            "name": name,
            "themeId": theme_id,
            "status": "draft",
            "views": 0,
            "createdAt": now,
            "updatedAt": now,
            "appearance": appearance or {"theme": "light", "accentColor": "#4F46E5", "font": "Inter"},
            "data": data or {}
        }
        db_manager._portfolios[portfolio_id] = new_port
        return new_port

    def update_portfolio(self, portfolio_id: str, updates: dict) -> Dict[str, Any]:
        port = db_manager._portfolios.get(portfolio_id)
        if not port:
            raise ValueError(f"Portfolio {portfolio_id} not found.")

        for key, val in updates.items():
            if val is not None:
                port[key] = val

        port["updatedAt"] = datetime.utcnow().isoformat() + "Z"
        db_manager._portfolios[portfolio_id] = port
        return port

    def delete_portfolio(self, portfolio_id: str) -> bool:
        if portfolio_id in db_manager._portfolios:
            del db_manager._portfolios[portfolio_id]
            return True
        return False

    def publish_portfolio(self, portfolio_id: str) -> Dict[str, Any]:
        return self.update_portfolio(portfolio_id, {"status": "published"})

    def duplicate_portfolio(self, portfolio_id: str) -> Dict[str, Any]:
        existing = self.get_portfolio(portfolio_id)
        if not existing:
            raise ValueError(f"Portfolio {portfolio_id} not found.")

        dup_name = f"{existing['name']} (Copy)"
        return self.create_portfolio(
            user_id=existing.get("userId"),
            name=dup_name,
            theme_id=existing.get("themeId"),
            data=existing.get("data"),
            appearance=existing.get("appearance")
        )

    def get_themes(self) -> List[Dict[str, Any]]:
        return [
            {"id": "bento", "name": "Bento Grid", "desc": "Modular grid layout with high visual structure.", "tags": ["Modern", "Grid"], "usageCount": 891, "active": True, "featured": True, "color": "#3B82F6"},
            {"id": "brutalist", "name": "Neo-Brutalist", "desc": "Bold contrast, thick borders, offset shadows.", "tags": ["Expressive", "Bold"], "usageCount": 342, "active": True, "featured": False, "color": "#000000"},
            {"id": "minimal", "name": "Minimal Editorial", "desc": "Clean typography, whitespace, black & white tones.", "tags": ["Minimal", "Elegant"], "usageCount": 634, "active": True, "featured": False, "color": "#6B7280"},
            {"id": "glassmorphic", "name": "Glassmorphism", "desc": "Translucent glass panels, glowing blurs, dark mode.", "tags": ["Dark", "Glass"], "usageCount": 567, "active": True, "featured": False, "color": "#8B5CF6"},
            {"id": "spatial", "name": "Spatial UI", "desc": "Layered cards, soft depth shadows, modern feel.", "tags": ["Spatial", "Layered"], "usageCount": 412, "active": True, "featured": False, "color": "#818CF8"},
            {"id": "futuristic", "name": "Futuristic Terminal", "desc": "Developer terminal code aesthetic.", "tags": ["Developer", "Terminal"], "usageCount": 278, "active": True, "featured": False, "color": "#10B981"}
        ]

portfolio_service = PortfolioService()
