import {Experiment, FeatureConfig} from './config';
import {User, UserLabels} from "./User";

export class Feature {
    constructor(private feature: FeatureConfig, private name: string) {
    }

    getName() {
        return this.name;
    }

    conduct(user?: User) {
        const feature = this.feature;

        if (!user) {
            return this.feature.default;
        }

        const experiment = this.findMatchedExperiment(user.getLabels());

        if (!experiment) {
            return feature.default;
        }

        return experiment.variants && experiment.variants[0] ? experiment.variants[0].value : feature.default;
    }

    findMatchedExperiment(userLabels: UserLabels): Experiment | null {
        if (!this.feature.experiments) {
            return null;
        }


        return this.feature.experiments.find(({includes = {}, excludes = {}}) => {
            const excludesNames = Object.keys(excludes);
            const isExcluded = excludesNames.some(excludeName => {
                return !isEqual(excludes[excludeName], userLabels[excludeName]);
            });

            if (isExcluded) {
                return false;
            }

            const includesNames = Object.keys(includes);

            const isIncludes = includesNames.every(includeName => {
                return isEqual(includes[includeName], userLabels[includeName]);
            });

            return isIncludes;
        }) || null;
    }
}

const isEqual = (labelValue, userLabelValue) => [].concat(labelValue).includes(userLabelValue);
