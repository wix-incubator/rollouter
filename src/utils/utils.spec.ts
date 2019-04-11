import {toss} from './index';
// @ts-ignore
import * as uuid4 from 'uuid4';
const getAverageFromArray = (arr: number[]) => arr.reduce((p, c) => c += p) / arr.length;

describe('distribution', () => {
    const arr = Array.apply(null, Array(10000)).map(() => uuid4());

    const assertPresicionPerShare = (share: number, precision: number = 5) => {
        const distributions: number[] = [];
        for (let i = 0; i < 50; i++) {
            let itemsInBucket = 0;
            const controlShareDistributionNumber = arr.length / share;

            arr.forEach((uuid: string) => (toss(uuid) >= (1 - (1 / share))) && itemsInBucket++);

            const distribution = ((Math.abs(controlShareDistributionNumber - itemsInBucket)) / controlShareDistributionNumber) * 100;

            distributions.push(distribution);
        }


        const avg = getAverageFromArray(distributions);
        expect(avg).toBeLessThanOrEqual(precision);
    };
    it('distribution between two buckets', () => {
        assertPresicionPerShare(2);
    });

    it('distribution between five buckets', () => {
        assertPresicionPerShare(5);
    });
});