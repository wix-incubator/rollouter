import {Config, FeatureConfig} from './config';
import {Feature} from './Feature';
import {User} from './User';

export class Configuration {
    constructor(private config: Config) {

    }

    getByName(featureName: string): Feature {
        const feature = this.config.features[featureName];
        return feature ? new Feature(feature, featureName) : null;
    }

    getRaw(): Config {
        return this.config;
    }
}
