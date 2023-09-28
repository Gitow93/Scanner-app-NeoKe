const express = require("express");
const cors = require("cors");
require("dotenv").config();
const OpenAI = require("openai");

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
    res.json(response.data);
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
