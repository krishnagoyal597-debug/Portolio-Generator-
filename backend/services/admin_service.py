from typing import Dict, Any, List
from db import db_manager

class AdminService:
    def get_stats(self) -> Dict[str, Any]:
        users = list(db_manager._users.values())
        portfolios = list(db_manager._portfolios.values())
        
        published = len([p for p in portfolios if p.get("status") == "published"])
        drafts = len(portfolios) - published
        total_views = sum(p.get("views", 0) for p in portfolios) + 1248

        return {
            "totalUsers": len(users),
            "totalPortfolios": len(portfolios),
            "publishedPortfolios": published,
            "draftPortfolios": drafts,
            "totalViews": total_views,
            "aiGenerationsCount": 1420
        }

    def get_users(self, search: str = "", status: str = "all", page: int = 1, limit: int = 10) -> Dict[str, Any]:
        users = list(db_manager._users.values())
        
        if search:
            s = search.lower()
            users = [u for u in users if s in u["name"].lower() or s in u["email"].lower()]
            
        if status != "all":
            users = [u for u in users if u.get("status") == status]

        total = len(users)
        start = (page - 1) * limit
        paginated = users[start:start + limit]
        
        safe_users = [{k: v for k, v in u.items() if k != "password"} for u in paginated]

        return {
            "users": safe_users,
            "total": total,
            "page": page,
            "pages": max(1, (total + limit - 1) // limit)
        }

    def suspend_user(self, user_id: str) -> bool:
        user = db_manager._users.get(user_id)
        if not user:
            return False
        user["status"] = "suspended"
        return True

    def activate_user(self, user_id: str) -> bool:
        user = db_manager._users.get(user_id)
        if not user:
            return False
        user["status"] = "active"
        return True

    def delete_user(self, user_id: str) -> bool:
        if user_id in db_manager._users:
            del db_manager._users[user_id]
            return True
        return False

    def get_admin_portfolios(self, search: str = "", theme: str = "all", status: str = "all") -> List[Dict[str, Any]]:
        portfolios = list(db_manager._portfolios.values())
        
        if search:
            s = search.lower()
            portfolios = [p for p in portfolios if s in p.get("name", "").lower()]
            
        if theme != "all":
            portfolios = [p for p in portfolios if p.get("themeId") == theme]
            
        if status != "all":
            portfolios = [p for p in portfolios if p.get("status") == status]

        return portfolios

    def get_analytics(self, period: str = "month") -> Dict[str, Any]:
        if period == "week":
            data = [
                {"name": "Mon", "views": 120, "generations": 45, "users": 8},
                {"name": "Tue", "views": 180, "generations": 60, "users": 12},
                {"name": "Wed", "views": 240, "generations": 90, "users": 15},
                {"name": "Thu", "views": 210, "generations": 75, "users": 11},
                {"name": "Fri", "views": 310, "generations": 110, "users": 20},
                {"name": "Sat", "views": 190, "generations": 50, "users": 9},
                {"name": "Sun", "views": 160, "generations": 40, "users": 6}
            ]
        elif period == "year":
            data = [
                {"name": "Jan", "views": 1200, "generations": 450, "users": 80},
                {"name": "Feb", "views": 1800, "generations": 620, "users": 110},
                {"name": "Mar", "views": 2400, "generations": 890, "users": 160},
                {"name": "Apr", "views": 3100, "generations": 1100, "users": 210}
            ]
        else:  # month
            data = [
                {"name": "Week 1", "views": 650, "generations": 210, "users": 35},
                {"name": "Week 2", "views": 890, "generations": 320, "users": 48},
                {"name": "Week 3", "views": 1120, "generations": 410, "users": 62},
                {"name": "Week 4", "views": 980, "generations": 350, "users": 51}
            ]
            
        return {"period": period, "metrics": data}

admin_service = AdminService()
