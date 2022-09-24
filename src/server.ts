import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import {
  convertHourStringToMinutes,
  convertMinuteToHouresString,
} from "./utils/converterHours";
/**
 * Para usar o prisma foi instalado o @prisma/client como dependencia de produção.
 * instanciado ele numa constante para ter acesso ao banco de dados.
 */
const app = express();
const prisma = new PrismaClient();

app.use(express.json());
//permitir acesso somente desse endereço
/**
 *  app.use(
 *    cors({
 *      origin: "https://meuSite.com.br",
 *    }),
 *  );
 * */

//Permitir acesso de qualquer endereço
app.use(cors());

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
  const gameId: string = req.params.id;

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
        hourEnd: convertMinuteToHouresString(ad.hourEnd),
        hourStart: convertMinuteToHouresString(ad.hourStart),
      };
    }),
  );
});

app.get("/ads/:id/discord", async (req, res) => {
  const adId: string = req.params.id;

  const ads = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  return res.status(201).json({ discord: ads.discord });
});

app.post("/games/:id/ads", async (req, res) => {
  const newAds = req.body;
  const gameId: string = req.params.id;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: newAds.name,
      yearsPlaying: newAds.yearsPlaying,
      discord: newAds.discord,
      weekDays: newAds.weekDays.join(","),
      hourStart: convertHourStringToMinutes(newAds.hourStart),
      hourEnd: convertHourStringToMinutes(newAds.hourEnd),
      useVoiceChannel: newAds.useVoiceChannel,
    },
  });

  return res.status(201).json({
    ad,
  });
});

app.listen(3333, () => console.log("Server Running"));
