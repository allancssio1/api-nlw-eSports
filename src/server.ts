import express, { response } from "express";

const app = express();

app.get("/games", (req, res) => {
  return res.status(201).json({
    res: "trazer todos os games",
  });
});

app.get("/ads", (req, res) => {
  return res.status(201).json({ res: "todos os anúcios" });
});

app.get("/games/:id/ads", (req, res) => {
  return res.status(201).json({ res: "ads expecífico" });
});

app.get("/ads/:id/discord", (req, res) => {
  return res.status(201).json({ res: "discord expecífico" });
});

app.post("/ads", (req, res) => {
  return res.status(201).json({
    res: "criar anuncio",
  });
});

app.listen(3333, () => console.log("Server Running"));
