import { compose, EnhancerBuilder } from "@uniformdev/canvas";

import { contentfulModelConverter } from "@/enhancers/converters/contentfulModelConverter";
import {
  CANVAS_CONTENTFUL_MULTI_PARAMETER_TYPES,
  CANVAS_CONTENTFUL_PARAMETER_TYPES,
  CANVAS_CONTENTFUL_QUERY_PARAMETER_TYPES,
} from "@uniformdev/canvas-contentful";
import { contentfulConfigured } from "@/utils/contentful";

import { SALESFORCE_COMMERCE_CLOUD_PARAMETER_TYPES } from "@uniformdev/canvas-salesforce-commerce-cloud";
import { sfccConfigured, sfccEnhancer } from "@/enhancers/sfcc";
import { sfccModelConverter } from "./converters/sfccModelConverter";
import { contentfulEnhancer } from "./contentful/contentfulEnhancer";
import { contentfulMultiEnhancer } from "@/enhancers/contentful/contentfulMultiEnhancer";
import { contentfulQueryEnhancer } from "@/enhancers/contentful/contentfulQueryEnhancer";
import {
  CLOUDINARY_PARAMETER_TYPES,
  createCloudinaryEnhancer,
} from "@uniformdev/canvas-cloudinary";
import { cloudinaryModelConverter } from "./converters/cloudinaryModelConverter";

import { ALGOLIA_PARAMETER_TYPES } from "@uniformdev/canvas-algolia";
import { algoliaConfigured, algoliaEnhancer } from "./algolia/algoliaEnhancer";
import { algoliaConverter } from "./converters/algoliaConverter";

const nullEnhancer = () => {
  console.log("WARN: null enhancer called");
};

export const getEnhancers = (
  locale: string,
  preview: boolean
): EnhancerBuilder => {
  console.log("PASSED LOCALE", { locale });
  console.log("PREVIEW", { preview });

  let enhancingLocale = locale;
  if (!enhancingLocale) {
    enhancingLocale = process.env.CONTENTFUL_LOCALE || "en-US";
    console.log("USING LOCALE " + enhancingLocale);
  }

  return new EnhancerBuilder()
    .parameterType(
      SALESFORCE_COMMERCE_CLOUD_PARAMETER_TYPES,
      sfccConfigured
        ? compose(sfccEnhancer(), sfccModelConverter)
        : nullEnhancer
    )
    .parameterType(
      CANVAS_CONTENTFUL_PARAMETER_TYPES,
      contentfulConfigured
        ? compose(contentfulEnhancer(enhancingLocale), contentfulModelConverter)
        : nullEnhancer
    )
    .parameterType(
      CANVAS_CONTENTFUL_MULTI_PARAMETER_TYPES,
      contentfulConfigured
        ? compose(
            contentfulMultiEnhancer(enhancingLocale),
            contentfulModelConverter
          )
        : nullEnhancer
    )
    .parameterType(
      CANVAS_CONTENTFUL_QUERY_PARAMETER_TYPES,
      contentfulConfigured
        ? compose(
            contentfulQueryEnhancer(enhancingLocale),
            contentfulModelConverter
          )
        : nullEnhancer
    )
    .parameterType(
      CLOUDINARY_PARAMETER_TYPES,
      compose(createCloudinaryEnhancer(), cloudinaryModelConverter)
    )
    .parameterType(
      "algolia-record",
      algoliaConfigured
        ? compose(algoliaEnhancer(), algoliaConverter)
        : nullEnhancer
    );
};
