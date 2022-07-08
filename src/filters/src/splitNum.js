/**
 * 作者：Hyhello
 * 时间：2019-05-24
 * 描述：splitNum
 */

import { split } from '@hyhello/utils';

export default {
  name: 'splitNum',
  handler(val, index = 3, separated = ',') {
    return split(val, index, separated);
  }
};
