import { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";
import {
  CanvasClient,
  CANVAS_DRAFT_STATE,
  CANVAS_PUBLISHED_STATE,
  enhance,
} from "@uniformdev/canvas";
import NextCors from "nextjs-cors";
import { corsConfig } from "@/corsConfig";
import { getEnhancers } from "@/enhancers";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { serverRuntimeConfig } = getConfig();
    const { apiKey, projectId: projectIdEnvVar } = serverRuntimeConfig;

    await NextCors(req, res, corsConfig);

    const { url, query, headers } = req;
    const {
      skipEnhance,
      preview,
      projectId: projectIdQueryParam,
      state,
      slug,
      compositionId,
    } = query || {};
    const { locale } = headers || {};

    if (url?.includes("manifest")) {
      return res.status(400).json({
        message: "bad request",
      });
    }

    const projectId = projectIdQueryParam ?? projectIdEnvVar;
    if (!projectId) {
      return res.status(400).json({
        message: "bad request. projectId must be provided",
      });
    }

    const canvasClient = new CanvasClient({
      apiKey,
      projectId: projectId as string,
    });

    const stateNum: number = state ? +state : CANVAS_PUBLISHED_STATE;

    if (!slug && !compositionId) {
      const response = await canvasClient.getCompositionList({
        state: stateNum,
      });
      if (!response) {
        return res.status(404).json({
          message: "UniformComposition not found",
        });
      }
      return res.status(200).json(response);
    }

    let composition;

    if (slug) {
      const response = await canvasClient.getCompositionBySlug({
        slug: slug as string,
        state: stateNum,
      });
      composition = response.composition;
    } else if (compositionId) {
      const response = await canvasClient.getCompositionById({
        compositionId: compositionId as string,
        state: stateNum,
      });
      composition = response.composition;
    }

    if (!composition) {
      return res.status(404).json({
        message: "UniformComposition not found",
      });
    }

    const context = { preview: preview === "true" };
    if (!skipEnhance) {
      await enhance({
        composition: composition!,
        enhancers: getEnhancers(
          locale as string,
          preview === "true" || state === CANVAS_DRAFT_STATE.toString()
        ),
        context,
      });
    }

    return res.status(200).json({
      composition,
    });
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.log({ error });
    res.status(500).send(error);
  }
};
