export interface QueryClient {
  getProducts: ({
    text,
    options,
  }: {
    text?: string;
    options?: {
      category?: string;
      limit?: number;
      offset?: number;
      sort?: string;
      sortOrder?: string;
      variants?: boolean;
    };
  }) => Promise<any>;
  getExactProducts: ({ ids }: { ids: string[] }) => Promise<any[]>;
  getCategories: () => Promise<any[]>;
  getRecommenders: () => Promise<
    {
      name: string;
      description: string;
      recommenderType: string;
    }[]
  >;
  getRecommendations: ({ recommender, context }: any) => Promise<{
    products: any;
  }>;
}

export interface SignalTemplateCompositionValue {
  value: boolean;
}
