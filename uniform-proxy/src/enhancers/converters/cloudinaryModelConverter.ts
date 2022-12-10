type Image = {
  src: string;
  width: number;
  height: number;
  alt: string;
  srcSet?: string;
};

function transformImage(cloudinaryImage: any) {
  const { alt, width, height, srcset, rawurl, transformedurl } = cloudinaryImage || {};

  const transformedImage: Image = {
    src: transformedurl ?? rawurl,
    alt,
    width,
    height,
  };

  if (srcset) {
    transformedImage.srcSet = srcset;
  }

  return transformedImage;
}

export const cloudinaryModelConverter = ({ parameter }: any) => {
  const image = parameter.value;
  if (image) {
    if (Array.isArray(image)) {
      if (image.length === 1) {
        return transformImage(image[0]);
      } else {
        return image.map(image => transformImage(image));
      }
    }
    return transformImage(image);
  }
  return parameter.value;
};
