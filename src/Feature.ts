import {FeatureConfig} from './config';

export class Feature {
  constructor(private feature: FeatureConfig) {

  }

  getName() {
    return this.feature.featureName;
  }

  conduct(){
    const feature = this.feature;
    if (feature) {
      return feature.variants && feature.variants[0] ? feature.variants[0].value : null;
    }
    return null;
  }
}
