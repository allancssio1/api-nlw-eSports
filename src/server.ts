import express from "express";
import { PrismaClient } from "@prisma/client";
/**
 * Para usar o prisma foi instalado o @prisma/client como dependencia de produção.
 * instanciado ele numa constante para ter acesso ao banco de dados.
 */
const app = express();
const prisma = new PrismaClient();

app.get("/games", async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return res.status(201).json({ games });
});

app.get("/ads", (req, res) => {
  return res.status(201).json({ res: "todos os anúcios" });
});

app.get("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;

  /**
   * findMany é selecionar muitos
   * select é para filtrar o que vai ser trasido
   * orderBy é para ordenar por data de criação
   */
  const ads = await prisma.ad.findMany({
    select: {
      createdAt: true,
      hourEnd: true,
      hourStart: true,
      id: true,
      name: true,
      useVoiceChannel: true,
      weekDays: true,
      discord: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return res.status(201).json(
    ads.map((ad) => {
      return {
        ...ad,
        weekDays: ad.weekDays.split(","),
      };
    }),
  );
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
