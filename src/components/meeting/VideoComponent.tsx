import React, { useEffect, useRef } from 'react';

interface VideoComponentProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  stream: MediaStream | null;
}

const VideoComponent: React.FC<VideoComponentProps> = ({ stream, ...props }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (stream) {
        videoRef.current.srcObject = stream;
      } else {
        videoRef.current.srcObject = null;
      }
    }
  }, [stream]);

  return <video ref={videoRef} autoPlay playsInline {...props} />;
};

export default VideoComponent;
