/**
 * 作者：Hyhello
 * 时间：2019-05-31
 * 描述：time 组件
 * 是否采用 24小时制： 使用 Hour % 24, 不使用 Hour % 12
 */

import { formatDate } from '@hyhello/utils';

export default {
  name: 'DateTime',
  props: {
    tag: {
      type: String,
      default: 'div'
    },
    loop: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 1000
    },
    renderContent: {
      type: Function
    },
    formate: {
      type: String,
      default: 'yyyy-MM-dd hh:mm:ss'
    }
  },
  data() {
    return {
      timer: null,
      date: new Date()
    };
  },
  mounted() {
    if (this.loop) {
      this.step();
    }
  },
  methods: {
    clear() {
      if (this.timer) {
        window.clearInterval(this.timer);
        this.timer = null;
      }
    },
    step() {
      this.clear();
      this.timer = window.setInterval(() => {
        this.date = new Date();
      }, this.interval);
    }
  },
  watch: {
    loop(val) {
      if (val) this.step();
    }
  },
  beforeDestory() {
    this.clear();
  },
  render(h) {
    const { tag, renderContent } = this;
    return <tag role="time">{renderContent ? renderContent(h, this.date) : formatDate(this.date, this.formate)}</tag>;
  }
};
