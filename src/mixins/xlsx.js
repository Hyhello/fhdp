import { formatDate } from '@hyhello/utils';
import { convert2Pinyin } from '@/utils/pinyin';

// 可能转换为日期
function maybeConvertToDate(excelTimestamp) {
  const reg = /^\d{5}\.\d+$/;
  if (reg.test(excelTimestamp)) {
    return formatDate(new Date(((excelTimestamp - 70 * 365 - 19) * 86400 - 8 * 3600) * 1000), 'yyyy/MM/dd hh:mm');
  }
  return excelTimestamp;
}

export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    this.$bus.$on('xlsx-result', this.formatData);
  },
  methods: {
    formatData(list) {
      this.autoplay = false;
      this.list = list.reduce((temp, data) => {
        const obj = {};
        for (const key in data) {
          obj[convert2Pinyin(key)] = maybeConvertToDate(data[key]);
        }
        temp.push(obj);
        return temp;
      }, []);
      this.autoplay = this.list.length >= 10;
    }
  },
  beforeDestroy() {
    this.$bus.$off('xlsx-result', this.formatData);
  }
};
