import { NextApiRequest, NextApiResponse } from "next";
import {
  enhance,
  RootComponentInstance,
  generateHash,
} from "@uniformdev/canvas";
import NextCors from "nextjs-cors";
import getConfig from "next/config";
import { corsConfig } from "@/corsConfig";
import { getEnhancers } from "@/enhancers";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, corsConfig);
  const { method, query } = req;
  const { locale } = query || {};
  if (method !== "POST") {
    return res.status(405).json({ message: "Method not supported." });
  }

  // eslint-disable-next-line prefer-destructuring
  const body:
    | {
        composition: RootComponentInstance;
        hash: number;
      }
    | undefined = req.body;

  if (!body?.composition) {
    return res.status(400).json({ message: "Missing composition" });
  }

  const {
    serverRuntimeConfig: { previewSecret },
  } = getConfig();

  const { composition } = body;

  const hasProvidedHash = Boolean(body.hash);
  const hasConfiguredHash = Boolean(previewSecret);

  if (hasProvidedHash && hasConfiguredHash) {
    const calculatedHash = generateHash({
      composition,
      secret: previewSecret,
    });

    if (calculatedHash !== body.hash) {
      return res.status(401).json({ message: "Not authorized" });
    }
  } else if (hasConfiguredHash) {
    return res.status(401).json({ message: "Not authorized" });
  }

  await enhance({
    composition,
    enhancers: getEnhancers(locale as string, true),
    context: { preview: true },
  });

  return res.status(200).json({
    composition,
  });
};
