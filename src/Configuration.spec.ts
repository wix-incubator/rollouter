import {Configuration} from './Configuration';
import {Feature} from './Feature';
import * as configMock from '../test/configMock.json';
import {User} from './User';

describe('configuration', () => {
  const configuration = new Configuration(configMock);

  describe('getByName', () => {
    it('should get features matching name', () => {
      expect(configuration.getByName('allwaysTrueFeature')).toBeInstanceOf(Feature);
    });
  });

  describe('getRaw', () => {
    it('should return raw config', () => {
      expect(configuration.getRaw()).toEqual(configMock);
    });
  });

  describe('getFeatures', () => {
    const user = new User('qwe', {
      registered: true,
    });

    it('should find single feature', () => {
      const featues = configuration.getFeatures({
        user
      });
      expect(featues.map(f => f.getName())).not.toContain('unregisteredUserTrue');
    });
  });
});
