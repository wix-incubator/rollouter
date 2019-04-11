type Value = number | string | boolean;

interface variant {
    "slice": number,
    "value": Value
}

export interface Experiment {
    includes?: { [key: string]: Value | Array<Value> };
    excludes?: { [key: string]: Value | Array<Value> };
    variants?: variant[];
}

export type FeatureConfig = {
    default: string | boolean | number;
    experiments?: Experiment[];
};

export type Config = {
    features?: {
        [key: string]: FeatureConfig;
    }
};


