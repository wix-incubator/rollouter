import {FeatureConfig} from './config';

export class Feature {
  constructor(private features: Array<FeatureConfig>) {

  }

  conduct(){
    const feature = this.features[0];
    if (feature) {
      return feature.variants && feature.variants[0] ? feature.variants[0].value : undefined;
    }
  }
}
