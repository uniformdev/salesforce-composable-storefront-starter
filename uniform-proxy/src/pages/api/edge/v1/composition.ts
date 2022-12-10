import { NextApiRequest, NextApiResponse } from "next";
import {
  CanvasClient,
  CANVAS_PUBLISHED_STATE,
  enhance,
} from "@uniformdev/canvas";
import NextCors from "nextjs-cors";
import getConfig from "next/config";
import { corsConfig } from "@/corsConfig";
import { getEnhancers } from "@/enhancers";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { serverRuntimeConfig } = getConfig();
    const {
      upstreamHost,
      apiKey,
      projectId: projectIdEnvVar,
    } = serverRuntimeConfig;

    await NextCors(req, res, corsConfig);

    const { query, headers } = req;
    const { locale } = headers || {};
    const {
      skipEnhance,
      preview,
      projectMapId,
      projectMapNodePath,
      compositionId,
      projectId: projectIdQueryParam,
      state,
    } = query || {};

    const isFetchCompositionById = !!compositionId;

    const projectId = projectIdQueryParam ?? projectIdEnvVar;
    if (!projectId) {
      return res.status(400).json({
        message: "bad request. projectId must be provided",
      });
    }

    if (!isFetchCompositionById) {
      if (!projectMapId) {
        return res.status(400).json({
          message: "bad request. projectMapId must be provided",
        });
      }

      if (!projectMapNodePath) {
        return res.status(400).json({
          message: "bad request. projectMapNodePath must be provided",
        });
      }
    } else if (!compositionId) {
      return res.status(400).json({
        message: "bad request. compositionId must be provided",
      });
    }

    const canvasClient = new CanvasClient({
      apiKey: apiKey,
      apiHost: upstreamHost,
      projectId: projectId as string,
    });

    const stateNum: number = state ? +state : CANVAS_PUBLISHED_STATE;

    const { composition } = isFetchCompositionById
      ? await canvasClient.getCompositionById({
          compositionId: compositionId as string,
          state: stateNum,
          unstable_resolveData: true,
        })
      : await canvasClient.unstable_getCompositionByNodePath({
          projectMapId: projectMapId as string,
          projectMapNodePath: projectMapNodePath as string,
          state: stateNum,
          unstable_resolveData: true,
        });

    if (!composition) {
      return res.status(404).json({
        message: "Composition not found",
      });
    }

    const context = { preview: preview === "true" };
    if (!skipEnhance) {
      await enhance({
        composition: composition!,
        enhancers: getEnhancers(locale as string, preview === "true"),
        context,
      });
    }

    return res.status(200).json({
      composition,
    });
  } catch (error) {
    console.error(error.message);
    console.error(error);
    res.status(500).send(error);
  }
};
