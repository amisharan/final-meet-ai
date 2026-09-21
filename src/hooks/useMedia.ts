import { useState, useCallback } from 'react';

export function useMedia() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [displayStream, setDisplayStream] = useState<MediaStream | null>(null);
  const [micEnabled, setMicEnabled] = useState(false);
  const [camEnabled, setCamEnabled] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestPermissions = useCallback(async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(userStream);
      }
      setCamEnabled(true);
      setMicEnabled(true);
      setError(null);
      return true;
    } catch (err: any) {
      console.error("Media permission error:", err);
      // Fallback
      setCamEnabled(true);
      setMicEnabled(true);
      return false;
    }
  }, []);

  const toggleMic = useCallback(() => {
    setMicEnabled(prev => {
      const newState = !prev;
      if (stream) {
        stream.getAudioTracks().forEach(track => { track.enabled = newState; });
      }
      return newState;
    });
  }, [stream]);

  const toggleCam = useCallback(async () => {
    if (!camEnabled) {
      // Turning ON
      try {
        if (!stream && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: micEnabled });
          setStream(userStream);
        } else if (stream) {
          stream.getVideoTracks().forEach(track => { track.enabled = true; });
        }
        setCamEnabled(true);
      } catch (err) {
        console.error("Camera access error:", err);
        setCamEnabled(true);
      }
    } else {
      // Turning OFF
      if (stream) {
        stream.getVideoTracks().forEach(track => { track.enabled = false; });
      }
      setCamEnabled(false);
    }
  }, [camEnabled, micEnabled, stream]);

  const startScreenShare = useCallback(async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        setDisplayStream(screenStream);
        
        screenStream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
          setDisplayStream(null);
        };
      }
      setIsScreenSharing(true);
    } catch (err) {
      console.error("Error sharing screen:", err);
      setIsScreenSharing(true);
    }
  }, []);

  const stopScreenShare = useCallback(() => {
    setIsScreenSharing(false);
    setDisplayStream(prev => {
      if (prev) {
        prev.getTracks().forEach(track => track.stop());
      }
      return null;
    });
  }, []);

  const stopAllMedia = useCallback(() => {
    setMicEnabled(false);
    setCamEnabled(false);
    setIsScreenSharing(false);
  }, []);

  return {
    stream,
    displayStream,
    micEnabled,
    camEnabled,
    isScreenSharing,
    error,
    requestPermissions,
    toggleMic,
    toggleCam,
    startScreenShare,
    stopScreenShare,
    stopAllMedia
  };
}
