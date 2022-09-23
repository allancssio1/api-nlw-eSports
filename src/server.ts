import express from "express";
import { PrismaClient } from "@prisma/client";
/**
 * Para usar o prisma foi instalado o @prisma/client como dependencia de produção.
 * instanciado ele numa constante para ter acesso ao banco de dados.
 */
const app = express();
const prisma = new PrismaClient();

app.get("/games", async (req, res) => {
  const games = await prisma.game.findMany();

  return res.status(201).json({
    games,
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
