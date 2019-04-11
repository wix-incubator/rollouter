import * as md5 from 'md5';

const MAX_MD5_VALUE = 0xFF;
const RADIX = 16;
export const toss = (uuid: string) => (parseInt(md5(uuid).substr(0, 2), RADIX)) / MAX_MD5_VALUE;