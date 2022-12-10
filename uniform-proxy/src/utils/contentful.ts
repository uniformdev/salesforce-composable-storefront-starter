import { createClient } from "contentful";
import { ContentfulClientList } from "@uniformdev/canvas-contentful";

export function formatLocale(locale: string) {
  if (!locale) {
    return locale;
  }

  const parts = locale.split("-");
  if (parts.length <= 1) {
    return locale;
  }

  const firstPart = parts[0];
  const lastPart = parts[1].toUpperCase();
  const resultingLocale = `${firstPart}-${lastPart}`;
  console.warn("Formatted Contentful locale to: " + resultingLocale);
  return resultingLocale;
}

export const contentfulClients = (): ContentfulClientList => {
  const contentfulSpaceId = process.env.CONTENTFUL_SPACE_ID!;
  const contentfulEnvironment = process.env.CONTENTFUL_ENVIRONMENT ?? "master";
  const contentfulDeliveryToken = process.env.CONTENTFUL_CDA_ACCESS_TOKEN!;
  const contentfulPreviewToken = process.env.CONTENTFUL_CPA_ACCESS_TOKEN!;

  const client = createClient({
    space: contentfulSpaceId,
    environment: contentfulEnvironment,
    accessToken: contentfulDeliveryToken,
  });

  const previewClient = createClient({
    space: contentfulSpaceId,
    environment: contentfulEnvironment,
    accessToken: contentfulPreviewToken,
    host: "preview.contentful.com",
  });

  const clientList = new ContentfulClientList({ client, previewClient });

  return clientList;
};

export const contentfulConfigured: boolean = ![
  process.env.CONTENTFUL_SPACE_ID,
  process.env.CONTENTFUL_ENVIRONMENT || "master",
  process.env.CONTENTFUL_CDA_ACCESS_TOKEN,
  process.env.CONTENTFUL_CPA_ACCESS_TOKEN,
].includes(undefined);
