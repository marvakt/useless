import { useState } from 'react';
import CameraPreview from './components/CameraPreview';
import Header from './components/Header';
import LanguageSelector from './components/LanguageSelector';
import LoadingScreen from './components/LoadingScreen';
import MotivationCard from './components/MotivationCard';
import SongResult from './components/SongResult';
import VoiceRecorder from './components/VoiceRecorder';

function App() {
  const [language, setLanguage] = useState('manglish');
  const [appState, setAppState] = useState('HOME'); // HOME, RECORDING, PROCESSING, RESULT
  const [cameraStream, setCameraStream] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [showMotivation, setShowMotivation] = useState(false);

  // Real API state
  const [apiResult, setApiResult] = useState(null);
  const [apiError, setApiError] = useState(null);

  const handleRecordingComplete = async (blob) => {
    setAudioBlob(blob);
    setAppState('PROCESSING');
    setApiError(null);

    try {
      const formData = new FormData();
      formData.append('audio', blob, 'recording.webm');
      formData.append('language', language);

      const response = await fetch('https://useless-nwo9.onrender.com/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Failed to process audio');
      }

      setApiResult({
        roast: {
          lyrics: data.lyrics,
          audioUrl: data.audioUrl ? `https://useless-nwo9.onrender.com${data.audioUrl}` : '/assets/sounds/mock-song.mp3',
          title: "🚨 Roast Alert"
        },
        motivation: data.motivation
      });
      setAppState('RESULT');
    } catch (err) {
      console.error(err);
      setApiError(err.message);
      setAppState('HOME');
    }
  };

  const handleReset = () => {
    setAppState('HOME');
    setAudioBlob(null);
    setShowMotivation(false);
    setIsRecording(false);
    setApiResult(null);
    setApiError(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-50 font-sans selection:bg-orange-500/30 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Header language={language} />

        {apiError && (
          <div className="mb-6 p-4 bg-red-900/40 border border-red-500/50 rounded-xl text-center text-red-200">
            <p className="font-bold">Error connecting to your best friend:</p>
            <p>{apiError}</p>
          </div>
        )}

        {appState === 'HOME' || appState === 'RECORDING' ? (
          <div className="animate-fade-in-up">
            <LanguageSelector language={language} setLanguage={setLanguage} />
            <CameraPreview setCameraStream={setCameraStream} />
            <VoiceRecorder
              onRecordingComplete={handleRecordingComplete}
              isRecording={isRecording}
              setIsRecording={setIsRecording}
            />
          </div>
        ) : null}

        {appState === 'PROCESSING' && (
          <LoadingScreen />
        )}

        {appState === 'RESULT' && apiResult && (
          <div className="py-8">
            <SongResult
              roastData={apiResult.roast}
              onSongComplete={() => setShowMotivation(true)}
            />
            {showMotivation && (
              <MotivationCard
                motivationText={apiResult.motivation}
                onReset={handleReset}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
