export type FeatureConfig = {
  featureName: string;
  variants: any;
};

export type Config = {
  features?: Array<FeatureConfig>,
};
