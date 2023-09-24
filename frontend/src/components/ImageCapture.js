import React, { useRef } from "react";
import Webcam from "react-webcam";
import axios from "axios";

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

    try {
      const response = await axios.post(
        "http://localhost:5000/procesar-imagen",
        {
          imageData: imageSrc,
        }
      );

      console.log(response.data);
    } catch (error) {
      console.error("Error al enviar la imagen al servidor:", error);
    }
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
