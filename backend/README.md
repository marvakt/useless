# Ente Ponnu Aliya - Backend

This is the FastAPI backend for the "Ente Ponnu Aliya" hackathon project.

## Setup Instructions

1. Ensure you have Python installed.
2. Navigate to the `backend` directory:
   \`\`\`bash
   cd backend
   \`\`\`
3. (Optional) Create a virtual environment:
   \`\`\`bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\\Scripts\\activate
   \`\`\`
4. Install dependencies:
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`
5. Run the server:
   \`\`\`bash
   uvicorn app.main:app --reload
   \`\`\`

The server will start at \`http://127.0.0.1:8000\`.

## API Endpoints

- \`GET /health\` - Returns \`{"status": "ok"}\`
- \`POST /analyze\` - Accepts \`multipart/form-data\` (image, audio, language) and returns the mock analysis JSON.
