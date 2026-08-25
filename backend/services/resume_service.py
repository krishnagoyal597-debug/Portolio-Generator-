import uuid
import re
from typing import Dict, Any
from db import db_manager
from models.pydantic_models import ResumeAnalysisResult, SectionStatus, ImprovementItem

class ResumeService:
    def upload_resume(self, filename: str, content: bytes) -> dict:
        text = ""
        fn_lower = filename.lower()
        
        # 1. Parse PDF files
        if fn_lower.endswith(".pdf"):
            try:
                import io
                from pypdf import PdfReader
                reader = PdfReader(io.BytesIO(content))
                extracted = [page.extract_text() for page in reader.pages if page.extract_text()]
                if extracted:
                    text = "\n".join(extracted)
            except Exception as e:
                print(f"[ResumeService] PDF parsing error: {e}")

        # 2. Fallback for TXT/other plain text files or PDF regex fallback
        if not text:
            try:
                text = content.decode("utf-8", errors="ignore")
            except Exception:
                text = content.decode("latin1", errors="ignore")

        resume_id = f"res_{uuid.uuid4().hex[:8]}"
        
        resume_record = {
            "id": resume_id,
            "filename": filename,
            "size": len(content),
            "text": text
        }
        db_manager._resumes[resume_id] = resume_record
        return {"id": resume_id, "filename": filename, "size": len(content), "parsedLength": len(text)}

    def get_resume_text(self, resume_id: str) -> str:
        res = db_manager._resumes.get(resume_id)
        if not res:
            return ""
        return res.get("text", "")

    def analyze_resume(self, resume_id: str) -> Dict[str, Any]:
        text = self.get_resume_text(resume_id)
        if not text:
            # Fallback analysis for default sample text
            return self._perform_analysis("ANSHIKA BANSAL\nComputer Science Student...\nSKILLS: Python, Java, React...\nEDUCATION: B.Tech\nEXPERIENCE: Intern")

        return self._perform_analysis(text)

    def _perform_analysis(self, text: str) -> Dict[str, Any]:
        text_upper = text.upper()
        
        # Check standard resume sections
        has_contact = bool(re.search(r'[\w\.-]+@[\w\.-]+', text) or "CONTACT" in text_upper or "EMAIL" in text_upper)
        has_education = "EDUCATION" in text_upper or "UNIVERSITY" in text_upper or "DEGREE" in text_upper or "COLLEGE" in text_upper
        has_skills = "SKILLS" in text_upper or "TECHNOLOGIES" in text_upper or "TECH STACK" in text_upper
        has_experience = "EXPERIENCE" in text_upper or "WORK" in text_upper or "INTERNSHIP" in text_upper or "EMPLOYMENT" in text_upper
        has_projects = "PROJECTS" in text_upper or "PROJECT" in text_upper
        has_certifications = "CERTIFICATIONS" in text_upper or "CERTIFICATES" in text_upper or "COURSES" in text_upper
        has_achievements = "ACHIEVEMENTS" in text_upper or "AWARDS" in text_upper or "HONORS" in text_upper

        sections = [
            SectionStatus(id="contact", label="Contact Information", status="complete" if has_contact else "warning", detail="Email, Phone & Social Links").model_dump(),
            SectionStatus(id="education", label="Education", status="complete" if has_education else "missing", detail="Degrees & Institutions").model_dump(),
            SectionStatus(id="skills", label="Skills & Technologies", status="complete" if has_skills else "warning", detail="Technical & Soft Skills").model_dump(),
            SectionStatus(id="experience", label="Work Experience", status="complete" if has_experience else "warning", detail="Roles & Achievements").model_dump(),
            SectionStatus(id="projects", label="Projects", status="complete" if has_projects else "warning", detail="Portfolio Projects & Demos").model_dump(),
            SectionStatus(id="certifications", label="Certifications", status="complete" if has_certifications else "warning", detail="Professional Certifications").model_dump(),
            SectionStatus(id="achievements", label="Achievements & Awards", status="complete" if has_achievements else "warning", detail="Hackathons & Academic Honors").model_dump(),
        ]

        # Calculate ATS score
        score = 40
        if has_contact: score += 10
        if has_education: score += 10
        if has_skills: score += 15
        if has_experience: score += 15
        if has_projects: score += 5
        if has_certifications: score += 3
        if has_achievements: score += 2
        
        # Word count bonus
        word_count = len(text.split())
        if word_count > 150: score += 5
        score = min(score, 92)

        improvements = []
        if not has_projects:
            improvements.append(ImprovementItem(
                section="Projects",
                severity="warning",
                message="No dedicated projects section detected.",
                recommendation="Add 2-3 highlighted projects with GitHub links and tech stacks to showcase applied skill."
            ).model_dump())

        if not has_certifications:
            improvements.append(ImprovementItem(
                section="Certifications",
                severity="warning",
                message="No certifications listed.",
                recommendation="Include AWS, Google Cloud, or online course certifications to demonstrate continuous learning."
            ).model_dump())

        if not has_achievements:
            improvements.append(ImprovementItem(
                section="Achievements",
                severity="warning",
                message="No awards or achievements section found.",
                recommendation="List hackathon wins, honors, or open-source contributions."
            ).model_dump())

        return ResumeAnalysisResult(
            score=score,
            sections=sections,
            improvements=improvements,
            parsedText=text
        ).model_dump()

resume_service = ResumeService()
