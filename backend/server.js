const express = require("express");
const cors = require("cors");
require("dotenv").config();
const OpenAI = require("openai");
const axios = require("axios");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/process-text", async (req, res) => {
  const { text } = req.body;

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt: text,
      max_tokens: 4097 - text.length,
    });

    console.log("Respuesta de OpenAI:", response);
    res.json(response.choices[0].text.trim()); // Enviamos el texto reconocido
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      console.error(error.status);
      console.error(error.message);
      console.error(error.code);
      console.error(error.type);
    } else {
      console.log(error);
    }
    res.send(error);
  }
});

app.post("/translate", async (req, res) => {
  const { text, targetLanguage } = req.body;

  try {
    const response = await axios.post(
      "https://translation.googleapis.com/language/translate/v2",
      {},
      {
        params: {
          q: text,
          target: targetLanguage,
          key: process.env.GOOGLE_TRANSLATE_API_KEY,
        },
      }
    );

    const translation = response.data.data.translations[0].translatedText;
    res.json({ translation });
  } catch (error) {
    console.error("Error al traducir:", error);
    res.status(500).json({ error: "Error al traducir el texto" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
