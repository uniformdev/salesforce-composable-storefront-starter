import { createContentfulQueryEnhancer } from "@uniformdev/canvas-contentful";
import { contentfulClients, formatLocale } from "@/utils/contentful";

export const contentfulQueryEnhancer = (locale: string) => {
  return createContentfulQueryEnhancer({
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
