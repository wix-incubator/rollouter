import {Feature} from './Feature';
import {User} from './User';

describe('Feature', () => {
    describe('conduct', () => {
        const featureDef = {
            'default': 'thedefault',
            'experiments': [
                {
                    'includes': {
                        'registered': true
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
        it('should return default value when no user provided', () => {
            expect(feature.conduct()).toEqual('thedefault');
        });

        it('should return value from experiment that match user labels when user provided', () => {
            expect(feature.conduct(new User('me', {registered: true}))).toEqual(('notDefault'))
        });

        describe('depends on slice', () => {
            const featureDef = {
                'default': false,
                'experiments': [
                    {
                        variants: [
                            {
                                value: true,
                                slice: .5
                            }
                        ]
                    }
                ]
            };
            const feature = new Feature(featureDef, '');

            it('should belong to bucket 1', () => {
                expect(feature.conduct(new User('alien'))).toEqual((true))
            });

            it('should not belong to bucket 2', () => {
                expect(feature.conduct(new User('me'))).toEqual((false))
            });
        });

        describe('depends on feature', () => {
            const featureDef = {
                'default': false,
                'experiments': [
                    {
                        variants: [
                            {
                                value: true,
                                slice: .5
                            }
                        ]
                    }
                ]
            };
            //test11 - is magic string. For hash function
            const feature = new Feature(featureDef, 'test11');

            it('should belong to bucket 1', () => {
                expect(feature.conduct(new User('alien'))).toEqual((false))
            });

            it('should not belong to bucket 2', () => {
                expect(feature.conduct(new User('me'))).toEqual((true))
            });

        });

    });

    describe('findMatchedExperiment', () => {
        it('should return experiment suitable for user', () => {
            const featureName = 'registeredUserTrue';
            const featureDef = {
                'default': true,
                'experiments': [
                    {
                        'includes': {
                            'registered': true
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
                'default': true,
                'experiments': [
                    {
                        'includes': {
                            'registered': true
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
