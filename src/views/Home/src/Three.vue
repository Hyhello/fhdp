<!--
 * 作者：hyhello
 * 时间：2022-06-29
 * 描述：
-->
<style lang="scss" scoped>
  @include B(home) {
    @include E(three) {
      width: 100%;
      height: 100%;
      position: absolute;
      z-index: 1;
      left: 0;
      top: 0;
    }
  }
</style>
<template>
  <div class="hy-home__three"></div>
</template>
<script>
  import * as THREE from 'three';
  import * as dat from 'dat.gui';
  import { rangeArr } from '@hyhello/utils';
  import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
  import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

  let renderer, camera, scene, gui, light, controls, meshHelper, action;
  // const clock = new THREE.Clock();

  export default {
    name: 'Three',
    mounted() {
      this.initThree();
    },
    methods: {
      initRender() {
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(this.$el.clientWidth, this.$el.clientHeight);
        renderer.setClearColor(0xffffff, 1);
        renderer.shadowMap.enabled = true;
        // 告诉渲染器需要阴影效果
        this.$el.appendChild(renderer.domElement);
      },
      initCamera() {
        camera = new THREE.PerspectiveCamera(45, this.$el.clientWidth / this.$el.clientHeight, 1, 2000);
        camera.position.set(100, 200, 300);
      },
      initScene() {
        scene = new THREE.Scene();
        scene.background = new THREE.Color(0xa0a0a0);
        // scene.fog = new THREE.Fog(0xa0a0a0, 200, 1000);
      },
      initGui() {
        // 声明一个保存需求修改的相关数据的对象
        gui = {
          animation: true,
          helper: true // 模型辅助线
        };
        const datGui = new dat.GUI();

        datGui.add(gui, 'helper').onChange(function (e) {
          meshHelper.visible = e;
        });
      },
      initLight() {
        scene.add(new THREE.AmbientLight('blue'));
        light = new THREE.DirectionalLight(0xffffff);
        light.position.set(0, 200, 100);
        light.castShadow = true;
        light.shadow.camera.top = 180;
        light.shadow.camera.bottom = -100;
        light.shadow.camera.left = -120;
        light.shadow.camera.right = 120;
        // 告诉平行光需要开启阴影投射;
        light.castShadow = true;
        scene.add(light);
      },
      initModel() {
        // 辅助工具
        const helper = new THREE.AxesHelper(1000);
        scene.add(helper);

        // 添加地板割线
        const grid = new THREE.GridHelper(10000, 200, 0x000000, 0x000000);
        grid.material.opacity = 0.2;
        grid.material.transparent = true;
        scene.add(grid);

        // 加载模型
        const loader = new OBJLoader();
        loader.load('/public/mesh/贴片机.obj', function (mesh) {
          // 模型放大一百倍
          mesh.scale.set(0.5, 0.5, 0.5);
          mesh.rotateY(Math.PI / -2);
          const total = 25;
          rangeArr(total / 5).forEach((item, index) => {
            for (let i = 0; i < 5; i++) {
              const meshTemp = mesh.clone();
              meshTemp.translateZ(180 * index);
              meshTemp.translateX(-150 * i);
              scene.add(meshTemp);
            }
          });
        });
        loader.load('/public/mesh/检测AOR.obj', function (mesh) {
          // 模型放大一百倍
          mesh.scale.set(0.5, 0.5, 0.5);
          mesh.rotateY(Math.PI * -0.5);
          mesh.position.set(170, 0, 0);
          rangeArr(5).forEach((item, index) => {
            const meshTemp = mesh.clone();
            meshTemp.translateX(-150 * index);
            scene.add(meshTemp);
          });
        });
        loader.load('/public/mesh/炉子.obj', function (mesh) {
          // 模型放大一百倍
          mesh.scale.set(0.5, 0.5, 0.5);
          mesh.rotateY(Math.PI * -0.5);
          mesh.position.set(300, 0, 0);
          rangeArr(5).forEach((item, index) => {
            const meshTemp = mesh.clone();
            meshTemp.translateX(-150 * index);
            scene.add(meshTemp);
          });
        });
        loader.load('/public/mesh/切片机.obj', function (mesh) {
          // 模型放大一百倍
          mesh.scale.set(0.5, 0.5, 0.5);
          mesh.rotateY(Math.PI * -0.5);
          mesh.position.set(620, 0, -10);
          rangeArr(5).forEach((item, index) => {
            for (let i = 0; i < 5; i++) {
              const meshTemp = mesh.clone();
              meshTemp.translateX(-150 * index);
              meshTemp.translateZ(-180 * i);
              scene.add(meshTemp);
            }
          });
        });
      },
      initControls() {
        controls = new OrbitControls(camera, renderer.domElement);
        // 设置控制器的中心点
        controls.target.set(0, 100, 0);
        // 如果使用animate方法时，将此函数删除
        // controls.addEventListener( 'change', render );
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        controls.enableDamping = true;
        // 动态阻尼系数 就是鼠标拖拽旋转灵敏度
        // controls.dampingFactor = 0.25;
        // 是否可以缩放
        controls.enableZoom = true;
        // 是否自动旋转
        controls.autoRotate = false;
        controls.autoRotateSpeed = 0.5;
        // 设置相机距离原点的最远距离
        controls.minDistance = 1;
        // 设置相机距离原点的最远距离
        controls.maxDistance = 2000;
        // 是否开启右键拖拽
        controls.enablePan = true;
      },
      animate() {
        // 更新控制器
        controls.update();

        renderer.render(scene, camera);

        requestAnimationFrame(this.animate);
      },
      initThree() {
        // this.initGui();
        this.initRender();
        this.initScene();
        this.initCamera();
        this.initLight();
        this.initModel();
        this.initControls();

        this.animate();
        // window.onresize = onWindowResize;
      }
    }
  };
</script>
