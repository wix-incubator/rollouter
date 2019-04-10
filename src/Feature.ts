import {FeatureConfig} from './config';

export class Feature {
  constructor(private features: Array<FeatureConfig>) {

  }
  conduct(){
    return false;
  }
}
