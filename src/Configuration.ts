import {Config, FeatureConfig} from './config';
import {Feature} from './Feature';
import {User} from './User';

export class Configuration {
  constructor(private config: Config) {

  }

  getByName(featureName: string): Feature {
    return new Feature(this.config.features.filter(feature => {
      return feature.featureName === featureName;
    })[0]);
  }

  getFeatures({user, featureName}: {user?: User, featureName?: string}): Array<Feature> {
    let filteredFeatures: Array<FeatureConfig> = this.config.features;

    if (featureName) {
        filteredFeatures = this.config.features.filter(f => f.featureName === featureName);
    }

    const userLabels = user && user.getLabels() || {};


   return filteredFeatures
        .filter(feature => {
            const featureLabelNames = Object.keys(feature.includes || {});
            return featureLabelNames.every(labelName => {
                const [requiredLabel, userLabel] = [feature.includes[labelName], userLabels[labelName]];
                return Array.isArray(requiredLabel) ? requiredLabel.includes(userLabel) : requiredLabel === userLabel;
            });
        })
        .map(feature => new Feature(feature));
}

  getRaw(): Config {
    return this.config;
  }
}
