export type FeatureConfig = {
  featureName: string;
  includes?: {[key: string]: IncludesValue | Array<IncludesValue>}
  variants: any;
};

export type Config = {
  features?: Array<FeatureConfig>,
};

type IncludesValue = number | string | boolean;
