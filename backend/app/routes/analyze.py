from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from typing import Optional
from app.services.gemini import generate_roast_lyrics
from app.services.music import generate_music

router = APIRouter()

@router.post("/analyze")
async def analyze_input(
    image: Optional[UploadFile] = File(None),
    audio: Optional[UploadFile] = File(None),
    language: str = Form(...)
):
    """
    Accepts multipart/form-data.
    Calls Gemini multimodal API to analyze the inputs and generate a roasting song and motivation.
    """
    
    if language not in ["malayalam", "manglish"]:
        raise HTTPException(status_code=400, detail="Language must be 'malayalam' or 'manglish'")
        
    image_bytes = None
    image_mime = None
    if image:
        image_bytes = await image.read()
        image_mime = image.content_type
        
    audio_bytes = None
    audio_mime = None
    if audio:
        audio_bytes = await audio.read()
        audio_mime = audio.content_type
        
    try:
        # Call Gemini Service
        gemini_result = await generate_roast_lyrics(
            language=language,
            audio_bytes=audio_bytes,
            audio_mime=audio_mime,
            image_bytes=image_bytes,
            image_mime=image_mime
        )
        
        # 3. Generate Music (TTS)
        try:
            audio_url = await generate_music(
                lyrics=gemini_result.get("lyrics", ""),
                language=language
            )
        except Exception as e:
            print(f"Music Generation Failed: {e}")
            audio_url = None

        return {
            "success": True,
            "language": language,
            "lyrics": gemini_result.get("lyrics", ""),
            "motivation": gemini_result.get("motivation", ""),
            "audioUrl": audio_url
        }
    except Exception as e:
        print(f"Error in /analyze: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to process input using AI. Error: {str(e)}")
