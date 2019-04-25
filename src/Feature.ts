import {Experiment, FeatureConfig, Value} from './config';
import {User, UserLabels} from './User';
import {toss} from './utils';

export class Feature {
    constructor(private feature: FeatureConfig, private name: string) {
    }

    getName() {
        return this.name;
    }

    conduct(user?: User): Value {
        const feature = this.feature;

        if (!user) {
            return this.feature.default;
        }

        const experiment = this.findMatchedExperiment(user.getLabels());

        if (!experiment) {
            return feature.default;
        }

        let lastValue = 0;
        const buckets: [Value, number][] = [];

        experiment.variants.forEach(({value, slice}: { value: Value, slice: number }) => {
            const curr: [Value, number] = [value, slice + lastValue];
            lastValue += slice;

            buckets.push(curr);
        });

        const userToss = toss(user.getId() + this.name);

        const bucket = buckets.find(b => b[1] > userToss);

        return (bucket ? bucket[0] : feature.default) as Value;
    }

    findMatchedExperiment(userLabels: UserLabels): Experiment | null {
        if (!this.feature.experiments) {
            return null;
        }


        return this.feature.experiments.find(({includes = {}, excludes = {}}) => {
            if (
                Object.keys(excludes).some(excludeName => isEqual(excludes[excludeName], userLabels[excludeName]))
            ) {
                return false;
            }

            return Object.keys(includes).every(includeName => isEqual(includes[includeName], userLabels[includeName]));

        }) || null;
    }
}

const isEqual = (labelValue, userLabelValue) => [].concat(labelValue).includes(userLabelValue);
