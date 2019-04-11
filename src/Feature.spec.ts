import {Feature} from './Feature';
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


        describe('depends on slice', () => {
            const featureDef = {
                "default": false,
                "experiments": [
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

            describe('users belonging to bucket 1', () => {
                it('should get true', () => {
                    expect(feature.conduct(new User('alien' ))).toEqual((true))
                });
            });

            describe('users belonging to bucket 2', () => {
                it('should get false', () => {
                    expect(feature.conduct(new User('me'))).toEqual((false))
                });
            });
        });

        describe('depends on feature', () => {
            const featureDef = {
                "default": false,
                "experiments": [
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

            describe('users belonging to bucket 1', () => {
                it('should get true', () => {
                    expect(feature.conduct(new User('alien' ))).toEqual((false))
                });
            });

            describe('users belonging to bucket 2', () => {
                it('should get false', () => {
                    expect(feature.conduct(new User('me'))).toEqual((true))
                });
            });


        });

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
