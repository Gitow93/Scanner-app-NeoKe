import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const DocumentScanner = () => {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const startCamera = async () => {
    //creamos la función que nos dará acceso a la cámara
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      webcamRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error al acceder a la cámara:", err);
    }
  };

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  return (
    <div>
      <Webcam ref={webcamRef} />
      <button onClick={startCamera}>Iniciar Cámara</button>
      <button onClick={captureImage}>Capturar Imagen</button>
      {capturedImage && (
        <div>
          <h2>Imagen Capturada:</h2>
          <img src={capturedImage} alt="Captured" />
        </div>
      )}
    </div>
  );
};

export default DocumentScanner;
