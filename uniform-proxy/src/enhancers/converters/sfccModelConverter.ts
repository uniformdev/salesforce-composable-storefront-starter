export const sfccModelConverter = ({ parameter }: any) => {
  const productData = parameter.value;
  if (Array.isArray(productData)) {
    return productData.map((p) => transformProduct(p));
  } else {
    return transformProduct(productData);
  }
};

function transformProduct(product: any) {
  try {
    if (!product) {
      return product;
    }

    if (!product.imageGroups) {
      return product;
    }

    const productImages = product.imageGroups[0]?.images?.map((i) => {
      return { src: i.disBaseLink, alt: i.alt };
    });

    if (!product.variationAttributes) {
      return {
        ...product,
        images: productImages,
        rating: 4.3,
        reviewCount: 123,
      };
    }

    //processing colors
    const colorDefinitions = product.variationAttributes?.find(
      (a) => a.id === "color"
    )?.values;
    const colorMap = new Map();
    if (colorDefinitions) {
      colorDefinitions.forEach((c) => colorMap.set(c.value, c.name));
    }
    const productColors = [];
    product.variants?.forEach((v) => {
      productColors.push(colorMap.get(v.variationValues.color));
    });

    //processing sizes
    const sizeDefinitions = product.variationAttributes.find(
      (a) => a.id === "size"
    )?.values;
    const sizeMap = new Map();
    if (sizeDefinitions) {
      sizeDefinitions.forEach((c) => sizeMap.set(c.value, c.name));
    }
    const productSizes = [];
    product.variants.forEach((v) => {
      productSizes.push(sizeMap.get(v.variationValues.size));
    });

    const productData = {
      ...product,
      images: productImages,
      colors: Array.from(new Set(productColors)),
      sizes: Array.from(new Set(productSizes)),
      rating: 4.3,
      reviewCount: 123,
    };

    delete productData.imageGroups;
    return productData;
  } catch (err) {
    console.log({ err });
  }
}
