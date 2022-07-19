// 使用Vue2版本
import { defineConfig, loadEnv } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue2';
import PostcssPxToViewport from 'postcss-px-to-viewport';
const path = require('path');

export default defineConfig(({ command, mode }) => {
  let config = {};
  const env = loadEnv(mode, process.cwd()); // 根据服务环境获取环境变量
  // 情景模式配置
  if (command === 'serve') {
    // dev 独有配置
    config = {
      base: '/'
    };
  } else {
    // build 独有配置
    config = {
      base: env.VITE_APP_BASE, // 生产环境基础路径必须前后都带斜杠否则打包会出现警告提示
      build: {
        assetsInlineLimit: 1024,
        cssCodeSplit: true,
        chunkSizeWarningLimit: 1000,
        minify: 'terser', // 不设置此项drop_console不生效
        terserOptions: {
          // 打包编译清除控制台输出及debugger
          compress: {
            drop_console: true,
            drop_debugger: true
          }
        },
        outDir: env.VITE_APP_DIR,
        assetsDir: env.VITE_APP_ASSETS,
        rollupOptions: {
          // treeshake: true, // "smallest" | "safest" | "recommended" | Default: true
          input: './index.html',
          output: {
            // compact: true, // 这个选项在绑定预先最小化的代码时很有用
            // manualChunks(id) {
            //   if (id.includes('node_modules')) {
            //     return 'vendor';
            //   }
            // },
            manualChunks: {
              // 代码分割
              vue: ['vue', 'vue-router'],
              echarts: ['echarts']
            },
            entryFileNames: `${env.VITE_APP_ASSETS}/js/entry[hash].js`, // [name]-[hash] 入口文件
            chunkFileNames: `${env.VITE_APP_ASSETS}/js/chunk[hash].js`, // [name]-[hash] 共享文件
            assetFileNames: (assetInfo) => {
              if (assetInfo.name.endsWith('.css')) {
                return `${env.VITE_APP_ASSETS}/assets/css/[name]-[hash].[ext]`;
              } else if (
                assetInfo.name.endsWith('.eot') ||
                assetInfo.name.endsWith('.ttf') ||
                assetInfo.name.endsWith('.woff')
              ) {
                return `${env.VITE_APP_ASSETS}/assets/iconfont/[name]-[hash].[ext]`;
              } else if (
                assetInfo.name.endsWith('.jpg') ||
                assetInfo.name.endsWith('.png') ||
                assetInfo.name.endsWith('.jpeg') ||
                assetInfo.name.endsWith('.gif') ||
                assetInfo.name.endsWith('.bmp') ||
                assetInfo.name.endsWith('.svg')
              ) {
                return `${env.VITE_APP_ASSETS}/assets/images/[name]-[hash].[ext]`;
              } else {
                return `${env.VITE_APP_ASSETS}/assets/[name]-[hash].[ext]`;
              }
            } // [name]-[hash] 静态资源
          }
        },
        brotliSize: false // 启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
      }
    };
  }
  return {
    ...config, // 合并开发生产环境配置
    hmr: true,
    css: {
      charset: false,
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove();
                }
              }
            }
          },
          new PostcssPxToViewport({
            unitToConvert: 'px',
            viewportWidth: 1920,
            unitPrecision: 5,
            propList: ['*'],
            viewportUnit: 'vw',
            fontViewportUnit: 'vw',
            selectorBlackList: [],
            minPixelValue: 1,
            mediaQuery: false,
            replace: true,
            exclude: []
          })
        ]
      },
      preprocessorOptions: {
        scss: {
          charset: false, // 处理charset问题，默认为true检查样式编码
          // 处理全局公共样式兼容问题
          additionalData: `
          @import "./src/assets/css/bem.scss";
          @import "./src/assets/css/mixins.scss";
          @import "./src/assets/css/vars.scss";`
        }
      }
    },
    resolve: {
      extensions: ['.js', '.jsx', '.vue', '.json', '.scss'], // 处理文件扩展名
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
    },
    plugins: [createVuePlugin({ jsx: true })],
    // 代理配置
    server: {
      port: 8889,
      strictPort: true,
      proxy: {}
    },
    preview: {
      port: 9999
    }
  };
});
