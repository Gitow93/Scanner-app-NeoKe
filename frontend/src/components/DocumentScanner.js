import React, { useState } from "react";
import ImageCapture from "./ImageCapture";

const DocumentScanner = () => {
  const [capturedImage, setCapturedImage] = useState(null);

  return (
    <div>
      <ImageCapture />
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
