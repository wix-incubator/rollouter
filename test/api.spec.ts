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
      expect(instance.conduct('alwaysTrueFeature')).toEqual(true);
    });

    it('should conduct false feature', () => {
      expect(instance.conduct('alwaysFalseFeature')).toEqual(false);
    });

    it('should conduct unknown feature', () => {
      expect(instance.conduct('unknown')).toEqual(null);
    });
  });

  describe('user', () => {
    const instance = re.config(configMock);

    it('should bind user to instance', () => {
      const instance = re.user('qwe');
      expect(instance.user()).toHaveProperty('id', 'qwe');
    });

    it('should conduct feature for user by label', () => {
      const userScoped = instance.user('qwe', {registered: true});
      expect(userScoped.conduct('registeredUserTrue')).toEqual(true);
    });

    it('should return default feature value for user not included in label', () => {
      const userScoped = instance.user('qwe', {registered: false});
      expect(userScoped.conduct('registeredUserTrue')).toEqual(false);
    });
  });
});
