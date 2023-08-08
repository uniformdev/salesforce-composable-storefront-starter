import { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";
import NextCors from "nextjs-cors";
import { corsConfig } from "@/corsConfig";
import { ManifestClient } from "@uniformdev/context/api";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { serverRuntimeConfig } = getConfig();
    const { apiKey, projectId: projectIdEnvVar } = serverRuntimeConfig;

    await NextCors(req, res, corsConfig);

    const { query } = req;
    const { projectId: projectIdQueryParam } = query || {};

    const projectId = projectIdQueryParam ?? projectIdEnvVar;
    if (!projectId) {
      return res.status(400).json({
        message: "bad request. projectId must be provided",
      });
    }

    const manifestClient = new ManifestClient({
      apiKey,
      projectId: projectId as string,
    });

    const manifest = await manifestClient.get();
    return res.status(200).json(manifest);
  } catch (error) {
    /* eslint-disable-next-line no-console */
    console.log({ error });
    res.status(500).send(error);
  }
};
