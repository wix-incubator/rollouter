import {Feature} from './Feature';
import * as configMock from '../test/configMock.json';
import {User} from "./User";

describe('Feature', () => {
    describe('conduct', () => {
        const featureDef = {
            "default": 'thedefault',
            "experiments": [
                {
                    "includes": {
                        "registered": true
                    },
                    variants: [
                        {
                            value: 'notDefault',
                            slice: 1
                        }
                    ]
                }
            ]
        };
        const feature = new Feature(featureDef, 'testFeature');
        describe('when no user provided', () => {
            it('should return default value', () => {
                expect(feature.conduct()).toEqual('thedefault');
            });
        });

        describe('when user provided', () => {
            it('should return value from experiment that match user labels', () => {
                expect(feature.conduct(new User('me', {registered: true}))).toEqual(('notDefault'))
            });
        });
        // it('should conduct value when ')
    });

    describe('findMatchedExperiment', () => {
        it('should return experiment suitable for user', () => {
            const featureName = 'registeredUserTrue';
            const featureDef = {
                "default": true,
                "experiments": [
                    {
                        "includes": {
                            "registered": true
                        }
                    }
                ]
            };
            const feature = new Feature(featureDef, featureName);

            const labels = {
                registered: true,
            };

            expect(feature.findMatchedExperiment(labels)).toBe(featureDef.experiments[0]);
        });

        it('should return false', () => {
            const featureName = 'registeredUserTrue';
            const feature = new Feature({
                "default": true,
                "experiments": [
                    {
                        "includes": {
                            "registered": true
                        }
                    }
                ]
            }, featureName);

            const labels = {
                registered: false,
            };

            expect(feature.findMatchedExperiment(labels)).toBe(null);
        });
    });
});
