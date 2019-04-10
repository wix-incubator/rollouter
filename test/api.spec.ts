import re from '../src';
import * as configMock from './configMock.json';

describe('Rollouter', () => {
  describe('config', () => {
    it('should create instance', () => {
      const instance = re.config({});
      expect(instance).toHaveProperty('config');
    });

    it('should pass pack config', () => {
      const instance = re.config(configMock);
      expect(instance.config()).toEqual(configMock);
    });

    it('should not mutate instance', () => {
      re.config(configMock);
      expect(re.config()).toEqual(undefined);
    });
  });

  describe('conduct', () => {
    const instance = re.config(configMock);
    it('should conduct single experiment', () => {
      expect(instance.conduct('allwaysTrueFeature')).toEqual(true);
    });

    it('should conduct false feature', () => {
      expect(instance.conduct('allwaysFalseFeature')).toEqual(false);
    });

    it('should conduct unknown feature', () => {
      expect(instance.conduct('unknown')).toEqual(undefined);
    });
  });
});
