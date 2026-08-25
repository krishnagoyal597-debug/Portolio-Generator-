import os
import uuid
import jwt
from datetime import datetime, timedelta
from db import db_manager
from config import config

HAS_FIREBASE_ADMIN = False
try:
    import firebase_admin
    from firebase_admin import credentials, auth as firebase_auth
    cred_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'firebase-credentials.json')
    if os.path.exists(cred_path):
        if not firebase_admin._apps:
            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred)
            print("[Firebase] Admin SDK initialized successfully with service account.")
        HAS_FIREBASE_ADMIN = True
except Exception as e:
    print(f"[Firebase] Admin SDK init notice: {e}")
    HAS_FIREBASE_ADMIN = False

class AuthService:
    def __init__(self):
        self.secret_key = config.SECRET_KEY

    def create_token(self, user_id: str, email: str, role: str) -> str:
        payload = {
            "sub": user_id,
            "email": email,
            "role": role,
            "exp": datetime.utcnow() + timedelta(days=7),
            "iat": datetime.utcnow()
        }
        return jwt.encode(payload, self.secret_key, algorithm="HS256")

    def decode_token(self, token: str) -> dict:
        if not token:
            return None
            
        # 1. Try Firebase Admin token verification
        if HAS_FIREBASE_ADMIN:
            try:
                decoded_fb = firebase_auth.verify_id_token(token)
                if decoded_fb and 'uid' in decoded_fb:
                    user_id = str(decoded_fb['uid'])
                    user_email = decoded_fb.get('email', '')
                    user_name = decoded_fb.get('name') or (user_email.split('@')[0] if user_email else 'User')
                    user_avatar = decoded_fb.get('picture')
                    
                    user_obj = {
                        "id": user_id,
                        "name": user_name,
                        "email": user_email,
                        "role": "admin" if user_email.startswith("admin@") else "user",
                        "status": "active",
                        "avatar": user_avatar,
                        "createdAt": datetime.utcnow().isoformat() + "Z"
                    }
                    db_manager._users[user_id] = user_obj
                    return {
                        "sub": user_id,
                        "email": user_email,
                        "role": user_obj["role"],
                        "name": user_name,
                        "user": user_obj
                    }
            except Exception:
                pass

        # 2. Try verified JWT decode
        try:
            decoded = jwt.decode(token, self.secret_key, algorithms=["HS256"])
            if decoded and "sub" in decoded:
                user_id = decoded.get("sub")
                user_email = decoded.get("email", "")
                user_role = decoded.get("role", "user")
                if user_id not in db_manager._users:
                    db_manager._users[user_id] = {
                        "id": user_id,
                        "name": user_email.split("@")[0] if user_email else "User",
                        "email": user_email,
                        "role": user_role,
                        "status": "active",
                        "avatar": None,
                        "createdAt": datetime.utcnow().isoformat() + "Z"
                    }
                decoded["user"] = db_manager._users[user_id]
                return decoded
        except Exception:
            pass

        # 3. Fallback: try decoding JWT without verification for standard Supabase JWT payload
        try:
            unverified = jwt.decode(token, options={"verify_signature": False})
            if unverified and "sub" in unverified:
                user_id = unverified.get("sub")
                user_email = unverified.get("email", "")
                user_meta = unverified.get("user_metadata", {})
                user_name = user_meta.get("full_name") or user_meta.get("name") or (user_email.split("@")[0] if user_email else "User")
                
                user_obj = {
                    "id": user_id,
                    "name": user_name,
                    "email": user_email,
                    "role": "admin" if user_email.startswith("admin@") else "user",
                    "status": "active",
                    "avatar": user_meta.get("avatar_url") or user_meta.get("picture"),
                    "createdAt": datetime.utcnow().isoformat() + "Z"
                }
                db_manager._users[user_id] = user_obj
                
                return {
                    "sub": user_id,
                    "email": user_email,
                    "role": user_obj["role"],
                    "name": user_name,
                    "user": user_obj
                }
        except Exception:
            pass

        return None

    def signup(self, name: str, email: str, password: str) -> dict:
        email = email.strip().lower()
        
        for u in db_manager._users.values():
            if u["email"] == email:
                raise ValueError("An account with this email address already exists.")

        user_id = f"u_{uuid.uuid4().hex[:8]}"
        new_user = {
            "id": user_id,
            "name": name.strip(),
            "email": email,
            "password": password,
            "role": "admin" if email.startswith("admin@") else "user",
            "status": "active",
            "avatar": None,
            "createdAt": datetime.utcnow().isoformat() + "Z"
        }
        
        db_manager._users[user_id] = new_user
        
        token = self.create_token(user_id, email, new_user["role"])
        safe_user = {k: v for k, v in new_user.items() if k != "password"}
        
        return {
            "access_token": token,
            "token_type": "bearer",
            "user": safe_user
        }

    def login(self, email: str, password: str) -> dict:
        email = email.strip().lower()
        
        target_user = None
        for u in db_manager._users.values():
            if u["email"] == email and u["password"] == password:
                target_user = u
                break
                
        if not target_user:
            raise ValueError("Invalid email or password.")
            
        if target_user.get("status") == "suspended":
            raise ValueError("Your account has been suspended. Please contact support.")

        token = self.create_token(target_user["id"], target_user["email"], target_user.get("role", "user"))
        safe_user = {k: v for k, v in target_user.items() if k != "password"}
        
        return {
            "access_token": token,
            "token_type": "bearer",
            "user": safe_user
        }

    def get_user_by_id(self, user_id: str) -> dict:
        user = db_manager._users.get(user_id)
        if not user:
            return None
        return {k: v for k, v in user.items() if k != "password"}

auth_service = AuthService()
