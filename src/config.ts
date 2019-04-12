export type Value = number | string | boolean;

export interface Variant {
    "slice": number,
    "value": Value
}

export interface Experiment {
    includes?: { [key: string]: Value | Array<Value> };
    excludes?: { [key: string]: Value | Array<Value> };
    variants?: Variant[];
}

export type FeatureConfig = {
    default: Value;
    experiments?: Experiment[];
};

export type Config = {
    features?: {
        [key: string]: FeatureConfig;
    }
};


