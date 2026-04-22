import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const API_KEY = process.env.MOONSHOT_API_KEY;

// OpenAI 兼容接口
app.post("/v1/chat/completions", async (req, res) => {
  try {
    const body = req.body;

    // 🔥 强制 temperature
    body.temperature = 1;

    const response = await fetch("https://api.moonshot.cn/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify(body)
    });

    const data = await response.text();
    res.status(response.status).send(data);

  } catch (e) {
    res.status(500).send("error");
  }
});

// 测试用
app.get("/", (req, res) => {
  res.send("OK");
});

const port = process.env.PORT || 10000;

app.listen(port, "0.0.0.0", () => {
  console.log("running on port " + port);
});

import cors from "cors";
app.use(cors());
