import os
import uuid
from datetime import datetime
from config import config

try:
    from supabase import create_client, Client
    HAS_SUPABASE_SDK = True
except ImportError:
    HAS_SUPABASE_SDK = False

class SupabaseManager:
    """
    Supabase client wrapper with fallback in-memory data store for local dev & testing.
    """
    def __init__(self):
        self.client: Client = None
        self.is_connected = False
        
        url = config.SUPABASE_URL
        key = config.SUPABASE_KEY
        
        if HAS_SUPABASE_SDK and url and key and "mock" not in url:
            try:
                self.client = create_client(url, key)
                self.is_connected = True
                print("[Supabase] Successfully connected to live Supabase instance.")
            except Exception as e:
                print(f"[Supabase] Warning: Live connection failed ({e}). Falling back to local data store.")
        else:
            print("[Supabase] Running in local in-memory fallback mode.")
            
        # In-memory storage tables
        self._users = {
            "u0": {
                "id": "u0",
                "name": "Admin",
                "email": "admin@portfolioforge.com",
                "password": "admin123",
                "role": "admin",
                "status": "active",
                "avatar": None,
                "createdAt": "2023-12-01T00:00:00Z"
            },
            "u1": {
                "id": "u1",
                "name": "Anshika Bansal",
                "email": "anshika@example.com",
                "password": "password123",
                "role": "user",
                "status": "active",
                "avatar": None,
                "createdAt": "2024-01-15T00:00:00Z"
            }
        }
        
        self._portfolios = {
            "port-1": {
                "id": "port-1",
                "userId": "u1",
                "name": "Software Engineering Portfolio",
                "themeId": "bento",
                "status": "published",
                "views": 342,
                "createdAt": "2024-02-10T10:00:00Z",
                "updatedAt": datetime.now().isoformat(),
                "appearance": {"theme": "light", "accentColor": "#4F46E5", "font": "Inter"},
                "data": {
                    "name": "Anshika Bansal",
                    "title": "Computer Science & AI Engineer",
                    "tagline": "Building intelligent systems at the intersection of AI and software engineering.",
                    "email": "anshika.bansal@email.com",
                    "phone": "+91 98765 43210",
                    "location": "Delhi, India",
                    "linkedin": "linkedin.com/in/anshikabansal",
                    "github": "github.com/anshikabansal",
                    "website": "anshikabansal.dev",
                    "about": "I'm a Computer Science engineer specializing in AI/ML and full-stack development.",
                    "skillGroups": [
                        {"category": "Languages", "skills": ["Python", "Java", "JavaScript", "TypeScript", "SQL", "C++"]},
                        {"category": "AI / ML", "skills": ["TensorFlow", "PyTorch", "scikit-learn", "Hugging Face", "LangChain"]}
                    ],
                    "skills": ["Python", "Java", "JavaScript", "TypeScript", "SQL", "React", "FastAPI", "TensorFlow"],
                    "projects": [
                        {
                            "id": "p1", "name": "PortfolioForge", "featured": True,
                            "description": "AI-powered resume-to-portfolio generator.",
                            "technologies": ["React", "FastAPI", "Gemini API", "Python"],
                            "github": "github.com/anshikabansal/portfolioforge",
                            "highlights": "500+ portfolios generated · 6 unique themes"
                        }
                    ],
                    "education": [
                        {
                            "id": "e1", "degree": "B.Tech Computer Science",
                            "university": "Delhi Technological University",
                            "location": "Delhi, India", "startYear": "2021", "endYear": "2025"
                        }
                    ],
                    "experience": [
                        {
                            "id": "ex1", "company": "TechSolutions Pvt. Ltd.",
                            "position": "Software Development Intern",
                            "location": "Delhi, India", "startDate": "June 2024", "endDate": "August 2024",
                            "description": "Developed RESTful APIs with FastAPI and integrated ML models."
                        }
                    ],
                    "certifications": [
                        {"id": "c1", "name": "AWS Certified Cloud Practitioner", "issuer": "Amazon Web Services", "date": "2023"}
                    ],
                    "achievements": [
                        {"id": "a1", "title": "Smart India Hackathon 2024 — Finalist", "description": "Top 10 teams out of 50,000+ participants.", "date": "2024"}
                    ]
                }
            }
        }
        
        self._resumes = {}

db_manager = SupabaseManager()
