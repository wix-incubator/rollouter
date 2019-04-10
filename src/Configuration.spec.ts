import {Configuration} from './Configuration';
import {Feature} from './Feature';
import * as configMock from '../test/configMock.json';

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
});
