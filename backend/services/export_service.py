import os
from jinja2 import Environment, FileSystemLoader

TEMPLATE_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "templates")

TEMPLATE_MAP = {
    "bento": "export/bento.html",
    "brutalist": "export/brutalist.html",
    "brutalism": "export/brutalist.html",
    "newbrutalism": "export/brutalist.html",
    "minimal": "export/minimal.html",
    "minimalism": "export/minimal.html",
    "glassmorphic": "export/glassmorphic.html",
    "glassmorphism": "export/glassmorphic.html",
    "spatial": "export/bento.html",
    "futuristic": "export/glassmorphic.html"
}

class ExportService:
    def __init__(self):
        self.env = Environment(loader=FileSystemLoader(TEMPLATE_DIR))

    def generate_html(self, portfolio_data: dict, theme_id: str = "bento") -> str:
        theme_key = (theme_id or "bento").lower()
        template_name = TEMPLATE_MAP.get(theme_key, "export/bento.html")
        
        try:
            template = self.env.get_template(template_name)
            return template.render(data=portfolio_data, theme=theme_key)
        except Exception as e:
            # Fallback simple html generation if template fails
            name = portfolio_data.get("name") or portfolio_data.get("personalInfo", {}).get("name", "Portfolio")
            title = portfolio_data.get("title") or portfolio_data.get("personalInfo", {}).get("title", "")
            about = portfolio_data.get("about") or portfolio_data.get("personalInfo", {}).get("summary", "")
            
            return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{name} — {title}</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50 text-gray-900 font-sans p-8">
  <div class="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
    <h1 class="text-4xl font-bold text-indigo-600 mb-2">{name}</h1>
    <h2 class="text-xl text-gray-600 font-medium mb-6">{title}</h2>
    <p class="text-gray-700 leading-relaxed mb-6">{about}</p>
    <div class="border-t pt-4 text-xs text-gray-400">Generated with PortfolioForge</div>
  </div>
</body>
</html>"""

export_service = ExportService()
