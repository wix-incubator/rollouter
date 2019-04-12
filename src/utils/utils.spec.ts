import {toss} from './index';
// @ts-ignore
import * as uuid4 from 'uuid4';

const getAverageFromArray = (arr: number[]) => arr.reduce((p, c) => c += p) / arr.length;

describe('distribution', () => {
    const arr = Array.apply(null, Array(10000)).map(() => uuid4());

    const assertPresicionPerShare = (share: number, precision: number = 6) => {
        const distributions: number[] = [];
        for (let i = 0; i < 20; i++) {
            let itemsInBucket = 0;
            const controlShareDistributionNumber = arr.length / share;

            arr.forEach((uuid: string) => (toss(uuid) >= (1 - (1 / share))) && itemsInBucket++);

            const distribution = ((Math.abs(controlShareDistributionNumber - itemsInBucket)) / controlShareDistributionNumber) * 100;

            distributions.push(distribution);
        }


        const avg = getAverageFromArray(distributions);
        expect(avg).toBeLessThanOrEqual(precision);
    };
    it('should make linear distribution between two buckets', () => {
        assertPresicionPerShare(2);
    });

    it('should make linear distribution between five buckets', () => {
        assertPresicionPerShare(5);
    });

    it('should make linear secondary distribution with salt ', () => {
        const salt = 'someSalt';

        const uuidsLength = arr.length;

        let distributions = [];
        for (let i = 0; i < 20; i++) {
            const firstADistribution: any[] = arr.map(uuid => toss(uuid) >= 0.5 && uuid).filter(Boolean);
            const secondADistribution: any[] = arr.map(uuid => toss(`${uuid}_${salt}`) >= 0.5 && uuid).filter(Boolean);

            const distributionOfFirstAPartInSecondAPart = firstADistribution.reduce((acc, el) => {
                return acc + Number(secondADistribution.includes(el));
            }, 0);
            distributions.push(distributionOfFirstAPartInSecondAPart / (uuidsLength / 4));
        }

        const avg = getAverageFromArray(distributions);

        expect(avg).toBeLessThanOrEqual(5);
    });
});