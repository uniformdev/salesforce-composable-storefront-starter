import { createEnhancer, AlgoliaClient } from "@uniformdev/canvas-algolia";

const algoliaClient = new AlgoliaClient({
  applicationId: process.env.ALGOLIA_APPLICATION_ID,
  searchKey: process.env.ALGOLIA_API_KEY,
});

export const algoliaEnhancer = () => {
  return createEnhancer({
    clients: algoliaClient,
  });
};

export const algoliaConfigured: boolean = ![
  process.env.ALGOLIA_APPLICATION_ID,
  process.env.ALGOLIA_API_KEY,
].includes(undefined);
