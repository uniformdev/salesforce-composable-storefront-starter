import { createContentfulEnhancer } from '@uniformdev/canvas-contentful';
import { contentfulClients, formatLocale } from '../../utils/contentful';

export const contentfulEnhancer = (locale: string) => {
  return createContentfulEnhancer({
    client: contentfulClients(),
    useBatching: false,
    createQuery: ({ defaultQuery }) => {
      return {
        ...defaultQuery,
        locale: formatLocale(locale),
        select: 'fields,metadata',
        include: 3,
      };
    },
  });
};
