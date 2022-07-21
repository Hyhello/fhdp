/**
 * 作者：hyhello
 * 时间：2022-07-09
 * 描述：three.js
 */
import * as THREE from 'three';
import { rangeArr, on, off } from '@hyhello/utils';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const pos = {
  x: 0,
  y: 0,
  z: 0
};

const PATH_PREFIX = process.env.NODE_ENV !== 'development' ? '' : '/public';

// 加载模型
const oLoader = new OBJLoader();
const mLoader = new MTLLoader();
/**
 * 创建网格，即二维数组
 * @param {*} m
 * @param {*} n
 * @param {*} cb
 */
const rangeGrid = (m, n, cb) => {
  rangeArr(m).forEach((item, i) => {
    rangeArr(n).forEach((_, index) => {
      cb(i, index);
    });
  });
};

// 模型加载 (obj, mtl)
const load = (path, cb) => {
  mLoader.load(PATH_PREFIX + path + '.mtl', (materials) => {
    materials.preload();
    oLoader.setMaterials(materials).load(PATH_PREFIX + path + '.obj', cb);
  });
};

export default class Graph {
  constructor(el, options) {
    this.$el = el;

    this.isAnimate = false;

    this.$dpr = window.devicePixelRatio || 1;

    // 渲染器动画
    this.timer = null;

    this.emitClick = options.handleClick;

    // 场景、相机、渲染器
    this.scene = null;
    this.camera = null;
    this.renderer = null;

    this.init();

    // 绑定事件
    on(window, 'resize', this);
    on(this.renderer.domElement, 'click', this);
  }

  init() {
    const { scrollWidth, scrollHeight } = this.$el;
    // 初始化场景
    this.scene = new THREE.Scene();

    // 初始化相机
    this.camera = new THREE.PerspectiveCamera(45, scrollWidth / scrollHeight, 1, 10000);
    this.camera.position.set(-220, 500, 600);
    this.camera.up.x = 0;
    this.camera.up.y = 1;
    this.camera.up.z = 0;
    this.camera.lookAt(this.scene.position);

    // 初始化渲染器
    const renderer = (this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }));
    renderer.setPixelRatio(this.$dpr);
    renderer.setSize(scrollWidth * this.$dpr, scrollHeight * this.$dpr);
    renderer.shadowMap.enabled = true; // 是否启用阴影
    // 告诉渲染器需要阴影效果
    this.$el.appendChild(renderer.domElement);

    // 初始化灯光
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.4));
    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(300, 500, 700);
    light.penumbra = 0.2;
    light.decay = 2;
    light.shadow.camera.top = 180;
    light.shadow.camera.bottom = -100;
    light.shadow.camera.left = -120;
    light.shadow.camera.right = 120;
    // 告诉平行光需要开启阴影投射;
    light.castShadow = true;
    this.scene.add(light);

    // 辅助工具
    // const helper = new THREE.AxesHelper(1000);
    // helper.position.set(0, 0, 0);
    // this.scene.add(helper);

    // 添加地板割线
    const grid = new THREE.GridHelper(10000, 200, 0x2460a5, 0x2460a5);
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    this.scene.add(grid);

    // 模型组
    const group = new THREE.Group();
    // 标题Map
    const TITLE_MAP = Object.create(null);

    const TITLE_LIST = [3, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    THREE.DefaultLoadingManager.onLoad = () => {
      TITLE_LIST.forEach((idx, index) => {
        const groupClone = group.clone();
        const titleGroup = TITLE_MAP[idx];
        titleGroup.position.set(280 + index * -145, 0, 0);
        groupClone.add(titleGroup);
        groupClone.position.set(-950 * index + 3800, 0, 100);
        this.scene.add(groupClone);
      });
      this.renderer.render(this.scene, this.camera);
    };

    // 加载模型
    load('/mesh/切片机', (model) => {
      model.scale.set(0.3, 0.3, 0.3);
      model.rotateY(Math.PI * -0.5);
      model.name = '切片机';
      const modelGroup = new THREE.Group();
      modelGroup.position.set(-200, 0, 0);
      rangeGrid(2, 5, (hIndex, vIndex) => {
        const modelClone = model.clone();
        modelClone.position.set(-92 * hIndex, 0, -120 * vIndex);
        modelGroup.add(modelClone);
      });
      group.add(modelGroup);
    });

    load('/mesh/贴片机（异常）', (model) => {
      model.scale.set(0.3, 0.3, 0.3);
      model.rotateY(Math.PI * -0.5);
      model.name = '贴片机（异常）';
      const modelGroup = new THREE.Group();
      modelGroup.position.set(0, 0, 0);
      rangeGrid(2, 1, (hIndex, vIndex) => {
        const modelClone = model.clone();
        modelClone.position.set(-110 * hIndex, 0, -120 * vIndex);
        modelGroup.add(modelClone);
      });
      group.add(modelGroup);
    });

    load('/mesh/贴片机', (model) => {
      model.scale.set(0.3, 0.3, 0.3);
      model.rotateY(Math.PI * -0.5);
      model.name = '贴片机';
      const modelGroup = new THREE.Group();
      modelGroup.position.set(0, 0, 0);
      rangeGrid(2, 4, (hIndex, vIndex) => {
        const modelClone = model.clone();
        modelClone.position.set(-110 * hIndex, 0, -120 * (vIndex + 1));
        modelGroup.add(modelClone);
      });
      group.add(modelGroup);
    });

    load('/mesh/检测AOR', (model) => {
      model.scale.set(0.3, 0.3, 0.3);
      model.rotateY(Math.PI * -0.5);
      model.name = '检测AOR';
      const modelGroup = new THREE.Group();
      modelGroup.position.set(110, 0, 0);
      rangeGrid(1, 5, (hIndex, vIndex) => {
        const modelClone = model.clone();
        modelClone.position.set(0, 0, -120 * vIndex);
        modelGroup.add(modelClone);
      });
      group.add(modelGroup);
    });

    load('/mesh/炉子', (model) => {
      model.scale.set(0.3, 0.3, 0.3);
      model.rotateY(Math.PI * -0.5);
      model.name = '炉子';
      const modelGroup = new THREE.Group();
      modelGroup.position.set(190, 0, 0);
      rangeGrid(1, 4, (hIndex, vIndex) => {
        const modelClone = model.clone();
        modelClone.position.set(0, 0, -120 * vIndex);
        modelGroup.add(modelClone);
      });
      group.add(modelGroup);
    });

    load('/mesh/炉子（异常）', (model) => {
      model.scale.set(0.3, 0.3, 0.3);
      model.rotateY(Math.PI * -0.5);
      model.name = '炉子（异常）';
      const modelGroup = new THREE.Group();
      modelGroup.position.set(190, 0, 0);
      rangeGrid(1, 1, (hIndex, vIndex) => {
        const modelClone = model.clone();
        modelClone.position.set(0, 0, -120 * 4);
        modelGroup.add(modelClone);
      });
      group.add(modelGroup);
    });

    // 加载标题
    TITLE_LIST.forEach((idx) => {
      const name = idx + '线';
      load(`/mesh/${name}`, (model) => {
        model.scale.set(0.3, 0.3, 0.3);
        model.rotateY(Math.PI * -0.5);
        model.name = name;
        const modelGroup = new THREE.Group();
        rangeGrid(1, 5, (hIndex, vIndex) => {
          const modelClone = model.clone();
          modelClone.position.set(0, 0, -125 * vIndex + 75);
          modelGroup.add(modelClone);
        });
        TITLE_MAP[idx] = modelGroup;
      });
    });
  }

  handleEvent(e) {
    switch (e.type) {
      case 'click':
        this.handleClick(e);
        break;
      case 'resize':
        this.resize(e);
        break;
    }
  }

  // 尺寸update
  resize() {
    const { scrollWidth, scrollHeight } = this.$el;
    this.camera.aspect = scrollWidth / scrollHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(scrollWidth, scrollHeight);
  }

  handleClick(event) {
    if (this.isAnimate) return;
    event.preventDefault();

    // 声明 raycaster 和 mouse 变量
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // 通过鼠标点击位置,计算出 raycaster 所需点的位置,以屏幕为中心点,范围 -1 到 1
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // 通过鼠标点击的位置(二维坐标)和当前相机的矩阵计算出射线位置
    raycaster.setFromCamera(mouse, this.camera);

    // 获取与raycaster射线相交的数组集合，其中的元素按照距离排序，越近的越靠前
    const intersects = raycaster.intersectObjects(this.scene.children);
    if (intersects.length) {
      this.emitClick && this.emitClick(intersects[0].object, { clientX: event.clientX, clientY: event.clientY });
    } else {
      this.emitClick && this.emitClick();
    }
  }

  initControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // 设置控制器的中心点
    this.controls.target.set(0, 0, 0);
    // 如果使用animate方法时，将此函数删除
    // this.controls.addEventListener('change', this.render.bind(this));
    // 使动画循环使用时阻尼或自转 意思是否有惯性
    this.controls.enableDamping = true;
    // 动态阻尼系数 就是鼠标拖拽旋转灵敏度
    // this.controls.dampingFactor = 0.25;
    // 是否可以缩放
    this.controls.enableZoom = true;
    // 是否自动旋转
    this.controls.autoRotate = false;
    this.controls.autoRotateSpeed = 0.5;
    // 设置相机距离原点的最远距离
    this.controls.minDistance = 1;
    // 设置相机距离原点的最远距离
    this.controls.maxDistance = 10000;
    // 是否开启右键拖拽
    this.controls.enablePan = true;
  }

  render() {
    pos.y += 2;
    this.isAnimate = true;
    this.camera.position.y = pos.y;
    this.camera.updateProjectionMatrix();
    if (pos.y >= 500) {
      this.isAnimate = false;
      window.cancelAnimationFrame(this.timer);
      this.initControls();
      this.animate();
    } else {
      // 渲染到屏幕上面
      this.renderer.render(this.scene, this.camera);
      this.timer = window.requestAnimationFrame(this.render.bind(this));
    }
  }

  animate() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.timer = window.requestAnimationFrame(this.animate.bind(this));
  }

  destroy() {
    window.cancelAnimationFrame(this.timer);
    off(window, 'resize', this);
    off(this.renderer.domElement, 'click', this);
    this.timer = null;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
  }
}
