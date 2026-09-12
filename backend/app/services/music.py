import os
import uuid
import edge_tts

async def generate_music(lyrics: str, language: str) -> str:
    """
    Uses Microsoft Edge TTS to generate a spoken audio track of the lyrics.
    This bypasses the Google Lyria API billing restrictions completely.
    """
    # Clean up the lyrics so the TTS doesn't read the tags out loud
    cleaned_lyrics = lyrics.replace("[Verse]", "") \
                           .replace("[Verse 2]", "") \
                           .replace("[Chorus]", "") \
                           .replace("[Intro]", "") \
                           .replace("[Bridge]", "") \
                           .replace("[Final Chorus]", "") \
                           .replace("[", "") \
                           .replace("]", "")
    
    # Select a Malayalam voice for the savage best friend
    # ml-IN-MidhunNeural (Male) or ml-IN-SobhanaNeural (Female)
    voice = "ml-IN-MidhunNeural"
    
    # Save to file
    file_uuid = str(uuid.uuid4())
    filename = f"{file_uuid}.mp3"
    filepath = os.path.join("generated", filename)

    os.makedirs("generated", exist_ok=True)

    try:
        communicate = edge_tts.Communicate(cleaned_lyrics, voice)
        await communicate.save(filepath)
        return f"/audio/{filename}"
    except Exception as e:
        print(f"TTS Generation Error: {e}")
        raise
