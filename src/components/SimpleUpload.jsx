/**
 * 作者：hyhello
 * 时间：2022-07-06
 * 描述：简易upload
 */

import * as XLSX from 'xlsx';

const createInputFileElement = () => {
  const el = document.createElement('input');
  el.setAttribute('type', 'file');
  el.setAttribute(
    'accept',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
  );
  return el;
};

export default {
  name: 'SimpleUpload',
  abstract: true,
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleTrigger() {
      const self = this;
      const inputEl = createInputFileElement();
      inputEl.onchange = function () {
        if (this.files.length < 0) return;
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(this.files[0]);
        fileReader.onload = function (ev) {
          const wb = XLSX.read(ev.target.result, { type: 'buffer' });
          self.$emit('output', XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
        };
      };
      inputEl.click();
    }
  },
  render() {
    try {
      const vnode = this.$slots.default[0]; // 子组件的vnode
      if (this.disabled) return vnode;
      const event = vnode.data || {}; // 子组件绑定的click事件
      event.style = {
        cursor: 'pointer'
      };
      event.on = {
        click: this.handleTrigger
      };
      if (!vnode.data) vnode.data = event;
      return vnode;
    } catch (e) {
      console.error('components must contain elements');
      return null;
    }
  }
};
