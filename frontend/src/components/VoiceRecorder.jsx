import { Mic, Square } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const VoiceRecorder = ({ onRecordingComplete, isRecording, setIsRecording }) => {
  const [error, setError] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  useEffect(() => {
    // Check permission early, but don't start recording yet
    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
      // Just testing permission, stop tracks immediately to free mic
      stream.getTracks().forEach(track => track.stop());
    }).catch(err => {
      console.error("Mic error:", err);
      setError("🎙️ Mic permission allow cheyyu, appo ninne roast cheyyam 😂");
    });
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        onRecordingComplete(audioBlob);
        // Stop all tracks to turn off the red mic indicator in browser
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setError('');
    } catch (err) {
      console.error("Failed to start recording:", err);
      setError("🎙️ Mic permission allow cheyyu, appo ninne roast cheyyam 😂");
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  if (error) {
    return (
      <div className="text-center p-4 bg-red-900/30 border border-red-500/50 rounded-xl mb-6">
        <p className="text-red-300 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center mb-8">
      {!isRecording ? (
        <button
          onClick={startRecording}
          className="group relative flex items-center justify-center gap-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white px-8 py-5 rounded-full text-xl font-bold shadow-[0_0_40px_rgba(234,88,12,0.4)] hover:shadow-[0_0_60px_rgba(234,88,12,0.6)] transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="absolute inset-0 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-colors"></div>
          <Mic className="w-7 h-7" />
          PARAYEDA MONE
        </button>
      ) : (
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center gap-4 bg-slate-800/80 p-6 rounded-3xl shadow-2xl border border-slate-700/50 backdrop-blur-md mb-4">
            <div className="relative flex h-8 w-8 items-center justify-center">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600"></span>
            </div>
            <span className="text-xl font-bold text-slate-200">Listening...</span>
            <div className="flex items-end h-8 gap-1 ml-4">
              {/* Fake equalizer animation */}
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-1.5 bg-orange-500 rounded-t-sm"
                  style={{
                    height: '100%',
                    animation: `pulse ${0.5 + (i * 0.1)}s infinite alternate ease-in-out`
                  }}
                ></div>
              ))}
            </div>
          </div>
          <button
            onClick={stopRecording}
            className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-full font-medium transition-all"
          >
            <Square className="w-5 h-5" />
            Stop & Roast Me
          </button>
        </div>
      )}

      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes pulse {
          0% { height: 20%; }
          100% { height: 100%; }
        }
      `}} />
    </div>
  );
};

export default VoiceRecorder;
