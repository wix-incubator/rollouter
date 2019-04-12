import {Config, Value} from './config';
import {Configuration} from './Configuration';
import {User, UserData, UserLabels} from './User';
import {Feature} from './Feature';

export class Rollouter {
    private configuration: Configuration;
    private userData: User;

    constructor(params: { config?: Config | Configuration, user?: User } = {}) {
        if (params.config instanceof Configuration) {
            this.configuration = params.config;
        } else {
            this.configuration = new Configuration(params.config);
        }

        if (params.user) {
            this.userData = params.user;
        }
    }

    public config(): Config;
    public config(config: Config): Rollouter;
    public config(config?: Config): Config | Rollouter {
        if (typeof config === 'undefined') {
            return this.configuration.getRaw();
        } else {
            return new Rollouter({config, user: this.userData});
        }
    }

    public user(): UserData;
    public user(id: string, labels?: UserLabels): Rollouter;
    public user(id?: string, labels?: UserLabels) {
        if (typeof id === 'undefined') {
            return this.userData.getRaw();
        } else {
            return new Rollouter({config: this.configuration, user: new User(id, labels)});
        }
    }


    public conduct(): { [featureName: string]: Value }[] | null;
    public conduct(featureName: string): Value | null;
    public conduct(featureName?: string) {
        if (featureName) {
            const feature = this.configuration.getByName(featureName);
            return feature ? feature.conduct(this.userData) : null
        } else {
            const features = this.configuration.getRaw().features;
            return Object.keys(features)
                .map(featureName => (new Feature(features[featureName], featureName)))
                .map((feature: Feature) => {
                    const featureResult = feature.conduct(this.userData);
                    return typeof featureResult !== 'undefined' ? ({[feature.getName()]: featureResult}) : null;
                })
                .filter(Boolean) || null;
        }
    }

}

export default new Rollouter();
