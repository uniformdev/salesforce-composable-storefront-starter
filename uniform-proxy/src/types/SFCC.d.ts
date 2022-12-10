declare namespace SFCC {
  export type ProductPriceTable = {
    price?: number;
    pricebook?: string;
    quantity?: number;
  } & {
    [key: string]: any;
  };
  export type PriceRange = {
    maxPrice?: number;
    minPrice?: number;
    pricebook?: string;
  } & {
    [key: string]: any;
  };
  export type OptionValue = {
    default?: boolean;
    id: string;
    name?: string;
    price?: number;
  } & {
    [key: string]: any;
  };
  export type Master = {
    masterId: string;
    orderable?: boolean;
    price?: number;
    priceMax?: number;
    prices?: {
      [key: string]: any;
    };
  } & {
    [key: string]: any;
  };
  export type Category = {
    categories?: Array<Category>;
    description?: string;
    id: string;
    image?: string;
    name?: string;
    pageDescription?: string;
    pageKeywords?: string;
    pageTitle?: string;
    parentCategoryId?: string;
    parentCategoryTree?: Array<PathRecord>;
    thumbnail?: string;
  } & {
    [key: string]: any;
  };
  export type CategoryResult = {
    limit: number;
    data: Array<Category>;
    total: number;
  } & {
    [key: string]: any;
  };
  export type VariationAttribute = {
    id: string;
    name?: string;
    values?: Array<VariationAttributeValue>;
  } & {
    [key: string]: any;
  };
  export type RecommendationType = {
    displayValue: string;
    value: number;
  } & {
    [key: string]: any;
  };
  export type ProductType = {
    bundle?: boolean;
    item?: boolean;
    master?: boolean;
    option?: boolean;
    set?: boolean;
    variant?: boolean;
    variationGroup?: boolean;
  } & {
    [key: string]: any;
  };
  export type Recommendation = {
    calloutMsg?: string;
    image?: Image;
    longDescription?: string;
    name?: string;
    recommendationType: RecommendationType;
    recommendedItemId?: string;
    shortDescription?: string;
  } & {
    [key: string]: any;
  };
  export type Variant = {
    orderable?: boolean;
    price?: number;
    productId: string;
    tieredPrices?: Array<ProductPriceTable>;
    variationValues?: {
      [key: string]: any;
    };
  } & {
    [key: string]: any;
  };
  export type VariationGroup = {
    orderable: boolean;
    price: number;
    productId: string;
    variationValues: {
      [key: string]: any;
    };
  } & {
    [key: string]: any;
  };
  export type ProductResult = {
    limit: number;
    data: Array<Product>;
    total: number;
  } & {
    [key: string]: any;
  };
  export type ProductLink = {
    sourceProductId: string;
    sourceProductLink: string;
    targetProductId: string;
    targetProductLink: string;
    type: string;
  } & {
    [key: string]: any;
  };
  export type Inventory = {
    ats?: number;
    backorderable?: boolean;
    id: string;
    inStockDate?: any;
    orderable?: boolean;
    preorderable?: boolean;
    stockLevel?: number;
  } & {
    [key: string]: any;
  };
  export type ImageGroup = {
    images: Array<Image>;
    variationAttributes?: Array<VariationAttribute>;
    viewType: string;
  } & {
    [key: string]: any;
  };
  export type Option = {
    description?: string;
    id: string;
    image?: string;
    name?: string;
    values?: Array<OptionValue>;
  } & {
    [key: string]: any;
  };
  export type Product = {
    brand?: string;
    bundledProducts?: Array<BundledProduct>;
    currency?: string;
    ean?: string;
    fetchDate?: number;
    id: string;
    imageGroups?: Array<ImageGroup>;
    inventories?: Array<Inventory>;
    inventory?: Inventory;
    longDescription?: string;
    manufacturerName?: string;
    manufacturerSku?: string;
    master?: Master;
    minOrderQuantity?: number;
    name?: string;
    options?: Array<Option>;
    pageDescription?: string;
    pageKeywords?: string;
    pageTitle?: string;
    price?: number;
    pricePerUnit?: number;
    pricePerUnitMax?: number;
    priceMax?: number;
    priceRanges?: Array<PriceRange>;
    prices?: {
      [key: string]: any;
    };
    primaryCategoryId?: string;
    productLinks?: Array<ProductLink>;
    productPromotions?: Array<ProductPromotion>;
    recommendations?: Array<Recommendation>;
    setProducts?: Array<Product>;
    shortDescription?: string;
    stepQuantity?: number;
    tieredPrices?: Array<ProductPriceTable>;
    type?: ProductType;
    unit?: string;
    upc?: string;
    validFrom?: any;
    validTo?: any;
    variants?: Array<Variant>;
    variationAttributes?: Array<VariationAttribute>;
    variationGroups?: Array<VariationGroup>;
    variationValues?: {
      [key: string]: any;
    };
  } & {
    [key: string]: any;
  };
}
