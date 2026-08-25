from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field

# ─── PORTFOLIO DATA MODELS ────────────────────────────────────────────────────

class PersonalInfo(BaseModel):
    name: str = ""
    title: str = ""
    tagline: Optional[str] = ""
    profileImage: Optional[str] = None
    email: str = ""
    phone: Optional[str] = ""
    location: Optional[str] = ""
    linkedin: Optional[str] = ""
    github: Optional[str] = ""
    website: Optional[str] = ""
    summary: Optional[str] = ""
    about: Optional[str] = ""

class SkillGroup(BaseModel):
    category: str
    skills: List[str] = []

class Project(BaseModel):
    id: Optional[str] = None
    name: str
    description: str = ""
    technologies: List[str] = []
    github: Optional[str] = ""
    demo: Optional[str] = ""
    highlights: Optional[str] = ""
    featured: Optional[bool] = False
    image: Optional[str] = None

class Education(BaseModel):
    id: Optional[str] = None
    degree: str
    university: str = ""
    location: Optional[str] = ""
    startYear: Optional[str] = ""
    endYear: Optional[str] = ""
    grade: Optional[str] = ""
    description: Optional[str] = ""

class Experience(BaseModel):
    id: Optional[str] = None
    company: str
    position: str = ""
    location: Optional[str] = ""
    startDate: Optional[str] = ""
    endDate: Optional[str] = ""
    current: Optional[bool] = False
    description: str = ""

class Certification(BaseModel):
    id: Optional[str] = None
    name: str
    issuer: str = ""
    date: Optional[str] = ""
    link: Optional[str] = ""
    image: Optional[str] = None

class Achievement(BaseModel):
    id: Optional[str] = None
    title: str
    description: str = ""
    date: Optional[str] = ""

class Activity(BaseModel):
    id: Optional[str] = None
    title: str = ""
    organization: Optional[str] = ""
    role: Optional[str] = ""
    date: Optional[str] = ""
    description: Optional[str] = ""

class PortfolioJSON(BaseModel):
    name: str = ""
    title: str = ""
    tagline: Optional[str] = ""
    profileImage: Optional[str] = None
    email: str = ""
    phone: Optional[str] = ""
    location: Optional[str] = ""
    linkedin: Optional[str] = ""
    github: Optional[str] = ""
    website: Optional[str] = ""
    about: Optional[str] = ""
    skillGroups: List[SkillGroup] = []
    skills: List[str] = []
    projects: List[Project] = []
    education: List[Education] = []
    experience: List[Experience] = []
    certifications: List[Certification] = []
    achievements: List[Achievement] = []
    activities: List[Activity] = []

# ─── RESUME ANALYSIS MODELS ───────────────────────────────────────────────────

class SectionStatus(BaseModel):
    id: str
    label: str
    status: str  # 'complete', 'warning', 'missing'
    detail: Optional[str] = ""

class ImprovementItem(BaseModel):
    section: str
    severity: str  # 'missing', 'warning'
    message: str
    recommendation: str

class ResumeAnalysisResult(BaseModel):
    score: int = Field(ge=0, le=100)
    sections: List[SectionStatus] = []
    improvements: List[ImprovementItem] = []
    parsedText: Optional[str] = ""

# ─── AUTHENTICATION MODELS ───────────────────────────────────────────────────

class UserSignup(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    name: str
    email: str
    role: str = "user"  # 'user' or 'admin'
    avatar: Optional[str] = None
    status: str = "active"  # 'active' or 'suspended'
    createdAt: str = ""

class AuthToken(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# ─── PORTFOLIO MANAGEMENT MODELS ─────────────────────────────────────────────

class AppearanceSettings(BaseModel):
    theme: str = "light"
    accentColor: str = "#4F46E5"
    font: str = "Inter"

class PortfolioCreate(BaseModel):
    name: str
    themeId: str = "bento"
    data: Optional[PortfolioJSON] = None
    appearance: Optional[AppearanceSettings] = None

class PortfolioUpdate(BaseModel):
    name: Optional[str] = None
    themeId: Optional[str] = None
    status: Optional[str] = None  # 'draft', 'published'
    data: Optional[PortfolioJSON] = None
    appearance: Optional[AppearanceSettings] = None

class PortfolioResponse(BaseModel):
    id: str
    userId: str
    name: str
    themeId: str = "bento"
    status: str = "draft"
    views: int = 0
    data: PortfolioJSON
    appearance: Optional[AppearanceSettings] = None
    createdAt: str = ""
    updatedAt: str = ""

# ─── ADMIN & ANALYTICS MODELS ────────────────────────────────────────────────

class AdminStats(BaseModel):
    totalUsers: int = 0
    totalPortfolios: int = 0
    publishedPortfolios: int = 0
    draftPortfolios: int = 0
    totalViews: int = 0
    aiGenerationsCount: int = 0

class AnalyticsDataPoint(BaseModel):
    name: str
    views: int = 0
    generations: int = 0
    users: int = 0

class AnalyticsResponse(BaseModel):
    period: str
    metrics: List[AnalyticsDataPoint] = []
