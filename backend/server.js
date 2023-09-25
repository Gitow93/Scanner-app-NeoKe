const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/process-image", (req, res) => {
  const { imageData } = req.body;
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  console.log("Solicitud de procesamiento de imagen recibida");

  openai
    .createCompletion({
      model: "text-davinci-003",
      prompt,
    })
    .then((response) => {
      res.send(response);
      console.log(response.data);
    })
    .catch((error) => {
      res.send(error);
    });

  // try {
  //   const response = axios.post(
  //     "https://api.openai.com/v1/vision/compute",
  //     {
  //       model: "data:image/*;base64," + imageData,
  //     },
  //     {
  //       headers: {
  //         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
  //       },
  //     }
  //   );
  //   console.log("ok");
  //   res.send("ok");
  //   // console.log("Respuesta de OpenAI:", response.data);
  // } catch (error) {
  //   console.log("ko");
  //   res.send("ko", response.data.error);
  //   if (req.response) {
  //     console.error("Respuesta de error de OpenAI:", error.response.data);
  //   } else if (error.request) {
  //     console.error("No hay respuesta de OpenAI:", error.request);
  //   } else {
  //     console.error("Error al procesar la imagen con OpenAI:", error.message);
  //   }
  //   res.status(500).json({ error: "Error al procesar la imagen con OpenAI" });
  // }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
