import * as md5 from 'md5';

const MAX_MD5_VALUE = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF;
export const toss = (uuid: string) => (parseInt(md5(uuid), 16)) / MAX_MD5_VALUE;