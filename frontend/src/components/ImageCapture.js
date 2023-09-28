import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";

const ImageCapture = () => {
  const webcamRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const captureImage = async () => {
    setIsLoading(true);
    const imageSrc = webcamRef.current.getScreenshot();

    Tesseract.recognize(imageSrc, "osd+eng+spa", {
      logger: (info) => console.log(info),
    }).then(({ data: { text } }) => {
      console.log("Texto extraído:", text);

      fetch("http://localhost:5000/process-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Respuesta del servidor:", data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error al enviar texto al servidor:", error);
          setIsLoading(false);
        });
    });
  };

  return (
    <div>
      <Webcam ref={webcamRef} />
      <button onClick={captureImage} disabled={isLoading}>
        {isLoading ? "Procesando..." : "Capturar Imagen"}
      </button>
    </div>
  );
};

export default ImageCapture;
