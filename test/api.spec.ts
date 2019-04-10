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

  describe.skip('conduct', () => {
    it('should conduct single experiment', () => {
      const instance = re.config(configMock);
      expect(instance.conduct('myfeature')).toEqual(true);
    });
  });
});
