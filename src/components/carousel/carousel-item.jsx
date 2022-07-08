/**
 * 作者：Hyhello
 * 时间：2019-07-01
 * 描述：走马灯
 */
import './carousel.scss';

export default {
  name: 'CarouselItem',
  componentName: 'CarouselItem',
  props: {
    command: {
      type: String,
      default: ''
    }
  },
  render() {
    const { $slots } = this;
    return <li class="carousel_li-main">{$slots.default}</li>;
  }
};
