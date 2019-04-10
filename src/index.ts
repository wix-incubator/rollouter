import {Config} from './config';
import {Configuration} from './Configuration';

export class Rollouter {
  private configuration: Configuration;
  constructor(params: {config?: Config} = {}) {
    this.configuration = new Configuration(params.config);
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

  public conduct(featureName: string) {
    return this.configuration.getByName(featureName).conduct();
  }
}

export default new Rollouter();
