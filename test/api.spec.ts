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
        describe('buy feature name', () => {
            const instance = re.config(configMock);
            it('should conduct single experiment', () => {
                expect(instance.conduct('alwaysTrueFeature')).toEqual(true);
            });

            it('should conduct false feature', () => {
                expect(instance.conduct('alwaysFalseFeature')).toEqual(false);
            });

            it('should exclude by user label', () => {
                const instancePerUser = instance.user('que', {'imIncluded': true, 'imExcluded': true});
                expect(instancePerUser.conduct('registeredUserTrueWithExcluded')).toEqual('false');
            });

            it('should conduct unknown feature', () => {
                expect(instance.conduct('unknown')).toEqual(null);
            });
        });

        describe('all features', () => {
            const instance = re.config(configMock);
            it('should not content any feature (return all defaults)', () => {
                const instancePerUser = instance.user('que', {'some-not-existed-label': true});
                expect(instancePerUser.conduct()).toEqual([{'alwaysTrueFeature': true}, {'usFeature': false}, {'alwaysFalseFeature': false}, {'registeredUserTrue': false}, {'unregisteredUserTrue': true}, {'registeredUserTrueWithExcluded': 'false'}]);
            });

            it('should conduct one of features', () => {
                const instancePerUser = instance.user('que', {'geo': 'US'});
                expect(instancePerUser.conduct()).toEqual([{'alwaysTrueFeature': true}, {'usFeature': true}, {'alwaysFalseFeature': false}, {'registeredUserTrue': false}, {'unregisteredUserTrue': true}, {'registeredUserTrueWithExcluded': 'false'}]);
            });

            it('conduct multiple features', () => {
                const instancePerUser = instance.user('que', {'geo': 'US', 'registered': true, 'imIncluded': true});
                expect(instancePerUser.conduct()).toEqual([{'alwaysTrueFeature': true}, {'usFeature': true}, {'alwaysFalseFeature': false}, {'registeredUserTrue': true}, {'unregisteredUserTrue': true}, {'registeredUserTrueWithExcluded': 'true'}]);
            });

            it('conduct multiple features except excluded', () => {
                const instancePerUser = instance.user('que', {
                    'geo': 'US',
                    'registered': true,
                    'imIncluded': true,
                    'imExcluded': true
                });
                expect(instancePerUser.conduct()).toEqual([{'alwaysTrueFeature': true}, {'usFeature': true}, {'alwaysFalseFeature': false}, {'registeredUserTrue': true}, {'unregisteredUserTrue': true}, {'registeredUserTrueWithExcluded': 'false'}]);
            });

            it('should return null if no features specified', () => {
                const instance = re.config({}).user('que');
                expect(instance.conduct()).toBeNull();
            });
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
