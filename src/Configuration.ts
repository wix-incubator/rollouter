import {Config} from './config';
import {Feature} from './Feature';

export class Configuration {
  constructor(private config: Config) {

  }

  getByName(featureName: string): Feature {
    return new Feature(this.config.features.filter(feature => {
      return feature.featureName === featureName;
    }));
  }

  getRaw(): Config {
    return this.config;
  }
}
