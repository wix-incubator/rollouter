import {Feature} from './Feature';
import * as configMock from '../test/configMock.json';

describe('Feature', () => {
  describe('conduct', () => {
    it('should conduct value', () => {
      const feature = new Feature(configMock.features[0]);
      expect(feature.conduct()).toEqual(true);
    });
  });
});
