import React, { useRef } from "react";
import Webcam from "react-webcam";

const ImageCapture = () => {
  const webcamRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      webcamRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error al acceder a la cámara:", err);
    }
  };

  const captureImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    const body = JSON.stringify({ imageData: imageSrc });

    const response = await fetch("http://localhost:5000/process-image", {
      method: "POST",
      body: body,
    });
    // console.log("response", response);
  };

  return (
    <div>
      <Webcam ref={webcamRef} />
      <button onClick={startCamera}>Iniciar Cámara</button>
      <button onClick={captureImage}>Capturar Imagen</button>
    </div>
  );
};

export default ImageCapture;
