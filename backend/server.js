const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/procesar-imagen", async (req, res) => {
  const { imageData } = req.body;

  console.log("Solicitud de procesamiento de imagen recibida");

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/vision/compute",
      {
        model: "data:image/*;base64," + imageData,
      },
      {
        headers: {
          Authorization: process.env.OPENAI_API_KEY,
        },
      }
    );

    console.log("Respuesta de OpenAI:", response.data);

    res.json(response.data);
  } catch (error) {
    if (error.response) {
      console.error("Respuesta de error de OpenAI:", error.response.data);
    } else if (error.request) {
      console.error("No hay respuesta de OpenAI:", error.request);
    } else {
      console.error("Error al procesar la imagen con OpenAI:", error.message);
    }
    res.status(500).json({ error: "Error al procesar la imagen con OpenAI" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
