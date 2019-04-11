import {Config} from './config';
import {Configuration} from './Configuration';
import {User, UserLabels, UserData} from './User';

export class Rollouter {
  private configuration: Configuration;
  private userData: User;

  constructor(params: {config?: Config | Configuration, user?: User} = {}) {
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
  public config(config: Config) : Rollouter;
  public config(config?: Config): Config | Rollouter {
    if (typeof config === 'undefined') {
      return this.configuration.getRaw();
    } else {
      return new Rollouter({config});
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


  public conduct(featureName: string) {
    const feature = this.configuration.getFeatures({featureName, user: this.userData});
    if (feature && feature[0]) {
      return feature[0].conduct()
    }
    return null;
  }
}

export default new Rollouter();
