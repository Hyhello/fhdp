/**
 * 作者：hyhello
 * 时间：2022-07-09
 * 描述：three.js
 */
import * as THREE from 'three';
// import * as dat from 'dat.gui';
import { rangeArr, on, off } from '@hyhello/utils';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

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
    this.camera = new THREE.PerspectiveCamera(45, scrollWidth / scrollHeight, 1, 2000);
    this.camera.position.set(-300, 550, 600);
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
    this.scene.add(new THREE.AmbientLight(0x000f46));
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0, 200, 100);
    light.castShadow = true;
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
    const grid = new THREE.GridHelper(10000, 300, 0x2460a5, 0x2460a5);
    grid.material.opacity = 0.2;
    grid.material.transparent = true;
    this.scene.add(grid);

    // 模型组
    const group = new THREE.Group();

    THREE.DefaultLoadingManager.onLoad = () => {
      rangeGrid(2, 1, (hIndex) => {
        const groupClone = group.clone();
        groupClone.position.set(-1100 * hIndex, 0, 80);
        this.scene.add(groupClone);
      });

      this.renderer.render(this.scene, this.camera);
    };

    // 加载模型
    load('/mesh/切片机', (model) => {
      model.scale.set(0.4, 0.4, 0.4);
      model.rotateY(Math.PI * -0.5);
      model.name = '切片机';
      const modelGroup = new THREE.Group();
      modelGroup.position.set(-270, 0, 0);
      rangeGrid(2, 5, (hIndex, vIndex) => {
        const modelClone = model.clone();
        modelClone.position.set(-122 * hIndex, 0, -160 * vIndex);
        modelGroup.add(modelClone);
      });
      group.add(modelGroup);
    });

    load('/mesh/贴片机', (model) => {
      model.scale.set(0.4, 0.4, 0.4);
      model.rotateY(Math.PI * -0.5);
      model.name = '贴片机';
      const modelGroup = new THREE.Group();
      modelGroup.position.set(0, 0, 0);
      rangeGrid(2, 5, (hIndex, vIndex) => {
        const modelClone = model.clone();
        modelClone.position.set(-145 * hIndex, 0, -160 * vIndex);
        modelGroup.add(modelClone);
      });
      group.add(modelGroup);
    });

    load('/mesh/检测AOR', (model) => {
      model.scale.set(0.4, 0.4, 0.4);
      model.rotateY(Math.PI * -0.5);
      model.name = '检测AOR';
      const modelGroup = new THREE.Group();
      modelGroup.position.set(150, 0, 0);
      rangeGrid(1, 5, (hIndex, vIndex) => {
        const modelClone = model.clone();
        modelClone.position.set(0, 0, -150 * vIndex);
        modelGroup.add(modelClone);
      });
      group.add(modelGroup);
    });

    load('/mesh/炉子', (model) => {
      model.scale.set(0.4, 0.4, 0.4);
      model.rotateY(Math.PI * -0.5);
      model.name = '炉子';
      const modelGroup = new THREE.Group();
      modelGroup.position.set(280, 0, 0);
      rangeGrid(1, 5, (hIndex, vIndex) => {
        const modelClone = model.clone();
        modelClone.position.set(0, 0, -150 * vIndex);
        modelGroup.add(modelClone);
      });
      group.add(modelGroup);
    });

    // this.initControls();
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

  bindEvent() {}

  // initControls() {
  //   this.controls = new OrbitControls(this.camera, this.renderer.domElement);
  //   // 设置控制器的中心点
  //   this.controls.target.set(0, 100, 0);
  //   // 如果使用animate方法时，将此函数删除
  //   // controls.addEventListener( 'change', render );
  //   // 使动画循环使用时阻尼或自转 意思是否有惯性
  //   this.controls.enableDamping = true;
  //   // 动态阻尼系数 就是鼠标拖拽旋转灵敏度
  //   // this.controls.dampingFactor = 0.25;
  //   // 是否可以缩放
  //   this.controls.enableZoom = true;
  //   // 是否自动旋转
  //   this.controls.autoRotate = false;
  //   this.controls.autoRotateSpeed = 0.5;
  //   // 设置相机距离原点的最远距离
  //   this.controls.minDistance = 1;
  //   // 设置相机距离原点的最远距离
  //   this.controls.maxDistance = 2000;
  //   // 是否开启右键拖拽
  //   this.controls.enablePan = true;
  // }

  render() {
    pos.y += 2;
    this.camera.position.y = pos.y;
    if (pos.y >= 550) {
      window.cancelAnimationFrame(this.timer);
    } else {
      // 渲染到屏幕上面
      this.renderer.render(this.scene, this.camera);
      this.timer = window.requestAnimationFrame(this.render.bind(this));
    }
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
