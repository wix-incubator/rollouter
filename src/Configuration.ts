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

    filteredFeatures = typeof featureName !== 'undefined' && this.config.features.filter(feature => {
      return feature.featureName === featureName;
    }) || filteredFeatures;

    const userLabels = user && user.getLabels() || {};


    filteredFeatures = filteredFeatures.filter(feature => {
      const featureLabelNames = Object.keys(feature.includes || {});

      return featureLabelNames.every(labelName => {
        const requiredLabel = feature.includes[labelName];
        const userLabel = userLabels[labelName];
        if (Array.isArray(requiredLabel)) {
          return requiredLabel.includes(userLabel);
        } else {
          return requiredLabel === userLabel;
        }
      });
    });

    return filteredFeatures.map(feature => new Feature(feature));
  }

  getRaw(): Config {
    return this.config;
  }
}
