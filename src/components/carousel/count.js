/**
 * 作者：Hyhello
 * 时间：2019-07-02
 * 描述：运动js
 */

const _toString = {}.toString;

const tween = {
  linear(t, b, c, d) {
    return (c * t) / d + b;
  },
  easeOutExpo(t, b, c, d) {
    return (c * (-Math.pow(2, (-10 * t) / d) + 1) * 1024) / 1023 + b;
  },
  easeOut(t, b, c, d) {
    return -c * ((t = t / d - 1) * t * t * t - 1) + b;
  }
};

const noop = () => {};

// 检查type
const _typeOf = (type) => {
  return _toString
    .call(type)
    .replace(/^\[object\s+(.*)\]$/, '$1')
    .toLowerCase();
};

// 判断是否是一个number
const ensureNumber = (n) => {
  return !isNaN(n) && typeof n === 'number';
};

// oneOf
const oneOf = (target, list) => {
  return list.some((item) => item === target);
};

// 配置文件
const defaults = {
  startVal: 0,
  endVal: 0,
  duration: 3000,
  easing: 'linear',
  progress: noop,
  complete: noop
};

export default class Count {
  // 配置文件
  constructor(options) {
    this.constructor._checkConf(options);
    this.$conf = Object.assign({}, defaults, options);

    const tweenList = Object.keys(tween);

    // 配置动画
    if (_typeOf(this.$conf.easing) !== 'function') {
      this.$conf.easing = tween[oneOf(this.$conf.easing, tweenList) ? this.$conf.easing : tweenList[0]];
    }
    this.$conf.origin_startVal = this.$conf.startVal;
    this.$conf.origin_endVal = this.$conf.endVal;
    this.$conf.origin_duration = this.$conf.duration;

    // 开始
    this.frameVal = 0;
    this.timer = null; // 当前timer 定时器key
    this.isStart = false; // 是否在运动
    this.isPause = false; // 是否暂停
    this.countDown = this.$conf.startVal > this.$conf.endVal;
  }

  // 校验
  static _checkConf(options) {
    Object.keys(defaults).forEach((item) => {
      const type = _typeOf(defaults[item]); // eslint-disable-next-line valid-typeof
      if (item === 'easing') return;
      if (options[item] && _typeOf(options[item]) !== type) {
        throw new TypeError('[Count] options property：' + item + ' is not a ' + type);
      }
    });
  }

  // 运动
  count(timestamp) {
    if (!this.startTime) {
      this.startTime = timestamp;
    }
    this.timestamp = timestamp;
    const progress = timestamp - this.startTime;
    this.remaining = this.$conf.duration - progress;
    const val = this.countDown
      ? this.$conf.startVal -
        this.$conf.easing(progress, 0, this.$conf.startVal - this.$conf.endVal, this.$conf.duration)
      : this.$conf.easing(progress, this.$conf.startVal, this.$conf.endVal - this.$conf.startVal, this.$conf.duration);
    this.frameVal = this.countDown ? Math.max(val, this.$conf.endVal) : Math.min(val, this.$conf.endVal);

    if (progress < this.$conf.duration) {
      this.isStart = true;
      this.timer = window.requestAnimationFrame(this.count.bind(this));
    } else {
      this.isStart = false;
    }

    // 回调
    this.$conf.progress(this.frameVal);
    !this.isStart && this.$conf.complete(this.$conf.endVal);
  }

  // 开始
  start() {
    if (this.isStart) return;
    if (this.$conf.startVal === this.$conf.endVal) {
      this.$conf.complete(this.$conf.endVal);
      return;
    }
    this.isStart = true;
    this.timer = requestAnimationFrame(this.count.bind(this));
  }

  // 设置配置
  setOptions(options) {
    options = options || {};
    this.constructor._checkConf(options);
    this.$conf = Object.assign(this.$conf, options);
  }

  // 重置
  reset() {
    this.startTime = 0;
    window.cancelAnimationFrame(this.timer);
    this.frameVal = 0;
    this.timer = null; // 当前timer 定时器key
    this.isStart = false; // 是否在运动
    this.isPause = false; // 是否暂停
    this.$conf.startVal = this.$conf.origin_startVal;
    this.$conf.endVal = this.$conf.origin_endVal;
    this.$conf.duration = this.$conf.origin_duration;
    this.countDown = this.$conf.startVal > this.$conf.endVal;
  }

  // 升级
  update(newEndVal) {
    newEndVal = Number(newEndVal);
    if (!ensureNumber(newEndVal)) {
      console.error('[CountUp] update() - new endVal is not a number: ' + newEndVal);
      return;
    }
    if (newEndVal === this.frameVal) return;
    window.cancelAnimationFrame(this.timer);
    this.timer = null;
    this.startTime = 0;
    this.$conf.startVal = this.frameVal || this.$conf.startVal;
    this.$conf.endVal = newEndVal;
    if (this.isStart) {
      this.$conf.duration = this.remaining;
    }
    this.countDown = this.$conf.startVal > this.$conf.endVal;
    this.timer = window.requestAnimationFrame(this.count.bind(this));
  }

  // 暂停
  pause() {
    if (!this.isStart) return;
    if (this.$conf.endVal === this.frameVal) return;
    this.isPause = true;
    window.cancelAnimationFrame(this.timer);
    this.timer = null;
  }

  // 恢复
  resume() {
    if (!this.isStart) return;
    if (this.$conf.endVal === this.frameVal) return;
    this.isPause = false;
    this.startTime = 0;
    this.$conf.startVal = this.frameVal;
    this.countDown = this.$conf.startVal > this.$conf.endVal;
    this.duration = this.remaining;
    this.timer = window.requestAnimationFrame(this.count.bind(this));
  }
}
