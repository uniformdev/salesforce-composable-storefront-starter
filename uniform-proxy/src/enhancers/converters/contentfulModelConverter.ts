import { Asset, Entry } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, NodeData } from '@contentful/rich-text-types';
import { Next } from '@contentful/rich-text-html-renderer';

function transformContentfulImage(imageField: Asset) {
  return {
    id: imageField?.sys?.id,
    src: imageField?.fields?.file?.url.replace('//', 'https://'),
    alt: imageField?.fields?.title,
    width: imageField?.fields?.file?.details?.image?.width,
    height: imageField?.fields?.file?.details?.image?.height,
  };
}

export const contentfulModelConverter = ({ parameter }: any) => {
  const entry = parameter.value;
  if (entry) {
    if (Array.isArray(entry)) {
      return entry.map(e => processEntry(e));
    }
    return processEntry(entry);
  }
  return parameter.value;
};

function processEntry(entry: any) {
  const content = { ...entry.fields };
  content.id = entry.sys.id;
  Object.keys(content).map(fieldKey => {
    if (
      Array.isArray(content[fieldKey]) &&
      content[fieldKey].length > 0 &&
      content[fieldKey][0]?.sys?.type === 'Asset'
    ) {
      const transformedImages = content[fieldKey].map((asset: Asset) => transformContentfulImage(asset));
      content[fieldKey] = transformedImages;
    } else if (Array.isArray(content[fieldKey])) {
      const flattenedFields = content[fieldKey].map((entry: Entry<any>) => {
        return { ...entry.fields };
      });
      content[fieldKey] = flattenedFields;
    }
    // contentful asset field transformation into a uniform model
    else if (content[fieldKey]?.sys?.type === 'Asset') {
      content[fieldKey] = transformContentfulImage(content[fieldKey]);
    } else if (content[fieldKey]?.sys?.id) {
      content[fieldKey] = processEntry(content[fieldKey]);
    }
    // processing contentful RTE here
    else if (content[fieldKey]?.nodeType === 'document') {
      content[fieldKey] = documentToHtmlString(content[fieldKey], articleRenderOptions);
    }
  });

  content.tags = entry.metadata?.tags.map((t: any) => t.sys.id);

  return content;
}

const articleRenderOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: NodeData, next: Next) => `<p class="pb-10 text-lg">${next(node.content)}</p>`,
    [BLOCKS.HEADING_2]: (node: NodeData, next: Next) => `<h2 class="pb-2.5 text-2xl">${next(node.content)}</h2>`,
    [BLOCKS.EMBEDDED_ASSET]: (node: NodeData) =>
      `<div class="pb-12 lg:pb-16 max-w-4xl">
            <img src="${node.data.target.fields.file.url}" 
                    height="${node.data.target.fields.file.details.image.height}"
                    width="${node.data.target.fields.file.details.image.width}" alt="${node.data.target.fields.description}"/>
          </div>`,
  },
};
