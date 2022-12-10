import { createContentfulMultiEnhancer } from "@uniformdev/canvas-contentful";
import { contentfulClients, formatLocale } from "@/utils/contentful";

export const contentfulMultiEnhancer = (locale: string) => {
  return createContentfulMultiEnhancer({
    clients: contentfulClients(),
    createQuery: ({ defaultQuery }) => {
      return {
        ...defaultQuery,
        select: "fields,metadata",
        locale: formatLocale(locale),
        include: 2,
      };
    },
  });
};
