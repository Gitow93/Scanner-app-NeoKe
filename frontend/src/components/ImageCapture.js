import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import Tesseract from "tesseract.js";
import axios from "axios";

const ImageCapture = () => {
  const webcamRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [translations, setTranslations] = useState("");

  const captureImage = async () => {
    setIsLoading(true);
    const imageSrc = webcamRef.current.getScreenshot();

    Tesseract.recognize(imageSrc, "osd+eng+spa", {
      logger: (info) => console.log(info),
    }).then(({ data: { text } }) => {
      console.log("Texto extraído:", text);

      axios
        .post(
          "http://localhost:5000/process-text",
          {
            text,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log("Respuesta del servidor:", response.data);

          axios
            .post(
              "http://localhost:5000/translate",
              {
                text: response.data, // Usamos el texto reconocido
                targetLanguage: "es", // Cambia según el idioma objetivo
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((responseTranslate) => {
              const traduccion = responseTranslate.data.translation;
              setTranslations(traduccion); // Actualizamos el estado de traducciones
              setIsLoading(false);
            })
            .catch((error) => {
              console.error("Error al traducir:", error);
              setIsLoading(false);
            });
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
      {translations && (
        <div>
          <h2>Texto reconocido:</h2>
          <p>{translations}</p>
        </div>
      )}
    </div>
  );
};

export default ImageCapture;
