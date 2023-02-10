export const algoliaConverter = ({ parameter }: any) => {
  const val = parameter.value;
  if (val) {
    if (Array.isArray(val)) {
      if (val.length === 1) {
        return val[0];
      } else {
        return val;
      }
    }
  }
  return parameter.value;
};
