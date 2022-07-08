/**
 * 作者：Hyhello
 * 时间：2019-07-01
 * 描述：走马灯
 */

import './carousel.scss';
import Count from './count';

// 转换为number
const toNumber = (n) => {
  const val = parseFloat(n);
  return isNaN(val) ? n : val;
};

// oneOf
const oneOf = (target, list) => {
  return list.some((item) => item === target);
};

// cloneVNode
const cloneVNode = (VNode) => {
  if (!VNode) return;
  return VNode.map((vnode, index) => {
    const key = vnode.key || index;
    return {
      ...vnode,
      key: `clone_#${key}`
    };
  });
};

// 格式化高度
const formateHeight = (str) => {
  const type = typeof str;
  if (type === 'number') return `${str}px`;
  if (/%|auto$/i.test(str)) return str;
  return `${toNumber(str)}px`;
};

export default {
  name: 'Carousel',
  props: {
    autoplay: {
      type: Boolean,
      default: true
    },
    type: {
      type: Number,
      default: 1,
      validator(val) {
        // 1 表示连续滚动
        // 2 表示会停顿滚动
        return oneOf(val, [1, 2]);
      }
    },
    // 只有在type === 1的情况下才生效
    speed: {
      type: Number,
      default: 1
    },
    // 方向
    placment: {
      type: String,
      default: 'top',
      validator(val) {
        return oneOf(val, ['top', 'bottom']);
      }
    },
    duration: {
      type: Number,
      default: 600
    },
    // 切换时间间隔
    interval: {
      type: Number,
      default: 3000
    },
    // 初始状态激活的幻灯片的索引
    initialIndex: {
      type: Number,
      default: 0
    },
    easing: {
      type: [String, Function],
      default: 'linear',
      validator(val) {
        return typeof val === 'function' || oneOf(val, ['easeOutExpo', 'easeOut', 'linear']);
      }
    },
    height: {
      type: [String, Number],
      default: 0
    }
  },
  watch: {
    autoplay(val) {
      if (val) {
        this.init();
      }
    }
  },
  data() {
    return {
      top: 0,
      timer: null,
      ulHeight: 0,
      currentType: this.type,
      sign: this.placment === 'top' ? 1 : -1,
      currentIndex: this.initialIndex
    };
  },
  computed: {
    styles() {
      return {
        height: formateHeight(this.height)
      };
    },
    ulStyle() {
      return {
        transform: `translateY(${this.top}px)`
      };
    }
  },
  mounted() {
    if (this.autoplay) {
      this.init();
    }
  },
  methods: {
    // 初始化
    init() {
      this.$nextTick(() => {
        const childList = this.findChild();
        const len = childList.length / 2;
        if (!len) return;
        this.ulHeight = this.$refs.ul.getBoundingClientRect().height;
        this.currentIndex = Math.min(len, Math.max(0, this.currentIndex));
        if (this.currentIndex === (this.sign === 1 ? len : 0)) {
          this.currentIndex = this.sign === 1 ? 0 : len;
        }
        // 不能直接读取childRect里面的height/offsetTop，渲染值并没有绑定上去，故此处需手动获取一次
        this.top = -childList[this.currentIndex].$el.offsetTop;
        if (this.currentType === 1) {
          this.step();
          return;
        }
        this._count = new Count({
          startVal: this.top,
          endVal: this.top,
          duration: this.duration,
          easing: this.easing,
          progress: this.progress,
          complete: this.complete
        });
        this._count.start();
      });
    },
    // 连续滚动
    step() {
      this.top -= this.sign * this.speed;
      if (this.sign === -1 && this.top >= 0) {
        this.top = -this.ulHeight / 2;
      }
      if (this.sign === 1 && Math.abs(this.top) >= this.ulHeight / 2) {
        this.top = 0;
      }
      this.timer = window.requestAnimationFrame(this.step);
    },
    clearTimeout() {
      if (this.timer) {
        const cancelTimeout = this.currentType === 1 ? window.cancelAnimationFrame : window.clearTimeout;
        cancelTimeout(this.timer);
        this.timer = null;
      }
    },
    // 鼠标移入
    pause() {
      if (this.currentType === 1) {
        this.clearTimeout();
        return;
      }
      if (!this.autoplay || !this._count) return;
      if (this._count.isStart) {
        this._count.pause();
      } else {
        this.clearTimeout();
      }
    },
    // 鼠标移出
    resume() {
      if (this.currentType === 1) {
        this.step();
        return;
      }
      if (!this.autoplay || !this._count) return;
      if (this._count.isPause) {
        this._count.resume();
      } else {
        this.complete();
      }
    },
    complete(val) {
      const childList = this.findChild();
      const mark = this.currentIndex === (this.sign === 1 ? childList.length / 2 : 0);
      if (mark) {
        this._count.reset();
        this.currentIndex = this.sign === 1 ? 0 : childList.length / 2;
        this.top = this._count.$conf.startVal = this._count.frameVal = -childList[this.currentIndex].$el.offsetTop;
      }
      // 抛出当前index
      if (val != null) {
        const command = childList[this.currentIndex].command;
        this.$emit('change', command || this.currentIndex);
      }
      this.clearTimeout();
      this.timer = setTimeout(() => {
        this.currentIndex += this.sign * 1;
        this._count.update(-childList[this.currentIndex].$el.offsetTop);
      }, this.interval);
    },
    findChild() {
      return this.$children.filter((item) => item.$options.componentName === 'CarouselItem');
    },
    // 下一个
    next() {
      if (this.currentType === 1) return;
      const childList = this.findChild();
      const len = childList.length;
      this.clearTimeout();
      this.currentIndex++;
      if (this.currentIndex >= len / 2) {
        this.currentIndex = 0;
        this._count.reset();
        this.top = this._count.$conf.startVal = this._count.frameVal = -childList[this.currentIndex].$el.offsetTop;
      }
      this._count.update(-childList[this.currentIndex].$el.offsetTop);
    },
    prev() {
      if (this.currentType === 1) return;
      const childList = this.findChild();
      const len = childList.length;
      this.clearTimeout();
      this.currentIndex--;
      if (this.currentIndex < 0) {
        this.currentIndex = len / 2;
        this._count.reset();
        this.top = this._count.$conf.startVal = this._count.frameVal = -childList[this.currentIndex].$el.offsetTop;
      }
      this._count.update(-childList[this.currentIndex].$el.offsetTop);
    },
    progress(val) {
      this.top = val;
    }
  },
  render() {
    const { $slots, styles, autoplay, ulStyle, pause, resume } = this;
    return (
      <div class="carousel_wrap-main" role="carousel" onMouseenter={pause} onMouseleave={resume} style={styles}>
        <ul class="carousel_ul-main" style={ulStyle} ref="ul">
          {$slots.default}
          {autoplay ? cloneVNode($slots.default) : null}
        </ul>
      </div>
    );
  },
  beforeDestroy() {
    this._count && this._count.reset();
    this.clearTimeout();
  }
};
